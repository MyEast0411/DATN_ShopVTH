import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function NhanVien() {
  const [showScanner, setShowScanner] = useState(false); // Biến trạng thái để kiểm soát việc hiển thị chỗ quét mã

  const handleStartScanning = () => {
    setShowScanner(true);
  }

  const handleEndScanning = () => {
    setShowScanner(false);
  }

  const handleScan = (data) => {
    console.log(data);
    if (data!=undefined) {
      // Xử lý kết quả quét ở đây
      handleEndScanning();
    }
  }

  const handleError = (error) => {
    console.error(error);
  }

  return (  
    <div>
      <p>Đây là giao diện quản lý nhân viên</p>
      {showScanner ? ( 
        <div>
          <QrReader
            onResult={handleScan}
            onError={handleError}
            style={{ width: '100%' }}
          />
        </div>
      ) : (
        <button onClick={handleStartScanning}>Bắt đầu quét mã</button>
      )}
    </div>
  );
}
