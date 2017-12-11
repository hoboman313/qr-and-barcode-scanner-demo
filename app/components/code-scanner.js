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
        Quagga.init(null, () => {
          Quagga.start();
        });
      });
    } else {
      Quagga.stop();
    }
  }),

  didInsertElement() {
    Quagga.onDetected(data => {
      set(this, 'result', data.codeResult.code);
    });
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
