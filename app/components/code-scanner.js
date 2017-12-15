import Component from '@ember/component';
import { setProperties, getProperties, observer, get, set, computed } from '@ember/object';
import $ from 'jquery';
import { next } from '@ember/runloop';
let { Quagga } = window;

export default Component.extend({
  classNames: ['centered'],

  isShowingQRScanner: false,
  isShowingBarcodeScanner: false,
  qrPlugin: null,

  cameraViewClass: computed('isShowingQRScanner', function() {
    return !get(this, 'isShowingQRScanner') ? 'display-none' : '';
  }),

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

  onIsQRCodeChanged: observer('isShowingQRScanner', function() {
    let { qrPlugin, isShowingQRScanner } = getProperties(this, 'qrPlugin', 'isShowingQRScanner');

    if (isShowingQRScanner) {
      next(() => {
        if (!qrPlugin) {
          const onError = error => {
            set(this, 'error', `${error.name} ${error.message ? '-' : ''} ${error.message}`);
          };
          const webCodeCamOptions = {
            resultFunction: result => {
              set(this, 'result', result.code);
            },
            getDevicesError: onError,
            getUserMediaError: onError,
            cameraError: onError,
            cameraSuccess: () => {}
          };

          qrPlugin = $('canvas#camera-view')
            .WebCodeCamJQuery(webCodeCamOptions)
            .data().plugin_WebCodeCamJQuery;

          set(this, 'qrPlugin', qrPlugin);
        }

        qrPlugin.play();
      });
    } else {
      qrPlugin.stop();
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
