// QRContext.js
import React, { createContext, useState, useContext } from 'react';

const QRContext = createContext();

const data=[
  "28.567190,77.320892",
  
]


export function QRProvider({ children }) {
  const [qrData, setQrData] = useState([]);

  return (
    <QRContext.Provider value={{ qrData, setQrData }}>
      {children}
    </QRContext.Provider>
  );
}

export function useQR() {
  return useContext(QRContext);
}
