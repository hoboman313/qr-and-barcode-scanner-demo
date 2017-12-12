import Component from '@ember/component';
import { isSupported } from 'ember-qr-scanner';
import { setProperties, observer, get, set } from '@ember/object';
import { next } from '@ember/runloop';
let { Quagga } = window;

export default Component.extend({
  isSupported,
  classNames: ['centered'],

  isShowingQRScanner: false,
  isShowingBarcodeScanner: false,

  onIsShowingBarcodeScannerChanged: observer('isShowingBarcodeScanner', function() {
    if (get(this, 'isShowingBarcodeScanner')) {
      next(() => {
        Quagga.init(
          {
            decoder: {
              readers: ['code_128_reader']
            }
          },
          () => {
            Quagga.start();
          }
        );
      });
    } else {
      Quagga.stop();
    }
  }),

  didInsertElement() {
    Quagga.onDetected(data => {
      let result = data.codeResult.code;

      if (this.isSaneResult(result)) {
        set(this, 'result', result);
      }
    });
  },

  isSaneResult(result) {
    // 16 chars in length and alpha-numerical values only
    return result.length === 16 && result.match(/^\w+$/);
  },

  actions: {
    toggleShowQR() {
      this.toggleProperty('isShowingQRScanner');

      setProperties(this, {
        isShowingBarcodeScanner: false,
        result: null
      });
    },

    toggleShowBarcode() {
      this.toggleProperty('isShowingBarcodeScanner');

      setProperties(this, {
        isShowingQRScanner: false,
        result: null
      });
    }
  }
});
