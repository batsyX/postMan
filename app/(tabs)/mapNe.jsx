import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useQR } from '../../context/QrContext';
import Dialog from "react-native-dialog";
import { useNavigation } from 'expo-router';



const MapPage = ({ route }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestLocation, setNearestLocation] = useState(null);
  const [askComplete, setAskComplete] = useState(false);
  const navigation =useNavigation();

  // qrData is from global context or route params
  const { qrData,setQrData } = useQR(); 
  
  var locations = qrData ? qrData.map(item => {
    const [latitude, longitude] = item.split(',');
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
  }) : [];

  // Function to calculate the distance between two coordinates using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = value => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Find the nearest location
  const findNearestLocation = (userLat, userLon) => {
    let nearest = null;
    let minDistance = Infinity;
    
    locations.forEach(location => {
      const distance = calculateDistance(userLat, userLon, location.latitude, location.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = location;
      }
    });

    return nearest;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Update every 10 meters
        },
        (location) => {
          const userCoords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };

          setUserLocation(userCoords);

          // Update the nearest location on each user location update
          const nearest = findNearestLocation(userCoords.latitude, userCoords.longitude);
          setNearestLocation(nearest);
        }
      );

      return () => locationSubscription.remove();
    })();
  }, []);

  if (!userLocation) {
    return <Text>Loading map...</Text>;
  }
  const checkDeivery=()=>{
    setAskComplete(false);
    navigation.navigate('home');
  }
  const askForComplete=()=>{
    setAskComplete(!askComplete);
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={userLocation}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={location}
            title={`Location ${index + 1}`}
          />
        ))}

        {/* Mark the nearest location with a different color */}
        {nearestLocation && (
          <Marker
            coordinate={nearestLocation}
            title="Nearest Location"
            pinColor="green"
            onPress={askForComplete}
          />
        )}

        {/* Draw a line between the user's location and the nearest location */}
        {nearestLocation && (
          <Polyline
            coordinates={[userLocation, nearestLocation]}
            strokeColor="#00f" // Custom color for the route
            strokeWidth={4}
          />
        )}
      </MapView>
      {
        askComplete && 
        <Dialog.Container visible={askComplete}>
          <Dialog.Title>Complete delivery?</Dialog.Title>
          <Dialog.Description>
            Do you want to complete the delivery?
          </Dialog.Description>
          <Dialog.Button label="No" onPress={askForComplete} />
          <Dialog.Button label="Yes" onPress={checkDeivery} />
        </Dialog.Container>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapPage;
