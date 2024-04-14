import React, { useState } from "react";
import Html5Qrcode from "html5-qrcode";

function QRCodeScanner() {
  const [showScanner, setShowScanner] = useState(false);
  const [result, setResult] = useState("");

  const startScanner = () => {
    setShowScanner(true);
    const qrCodeScanner = new Html5Qrcode("qr-code-reader");

    qrCodeScanner.start(
      (qrCodeScanner) => {
        qrCodeScanner.on("qrcode", (qrCodeMessage) => {
          setResult(qrCodeMessage);
          qrCodeScanner
            .stop()
            .then((ignore) => {
              // Đã quét được dữ liệu, tắt camera
              console.log("Camera đã tắt");
              setShowScanner(false);
            })
            .catch((err) => console.error(err));
        });
      },
      (err) => console.error(err)
    );
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      {!showScanner && <button onClick={startScanner}>Bắt đầu quét</button>}
      {showScanner && (
        <div>
          <div id="qr-code-reader"></div>
          <button onClick={() => setShowScanner(false)}>Dừng quét</button>
        </div>
      )}
      <p>{result}</p>
    </div>
  );
}

export default QRCodeScanner;
