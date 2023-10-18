import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

class ScanCCCD extends Component {
  state = {
    result: 'Chưa quét mã nào',
  };

  handleScan = (data) => {
    if (data) {
      this.setState({ result: data });
    }
  }

  handleError = (error) => {
    console.error(error);
  }

  render() {
    return (
      <div>
        <QrReader
          onScan={this.handleScan}
          onError={this.handleError}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default ScanCCCD;





