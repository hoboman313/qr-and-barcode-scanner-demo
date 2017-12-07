import Component from '@ember/component';
import { set } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  classNames: ['centered'],

  didInsertElement() {
    const onError = error => {
      set(this, 'error', `${error.name} ${error.message ? '-' : ''} ${error.message}`);
    };
    const webCodeCamOptions = {
      resultFunction: result => {
        set(this, 'result', `Format: ${result.format} - Value: ${result.code}`);
      },
      getDevicesError: onError,
      getUserMediaError: onError,
      cameraError: onError,
      cameraSuccess: () => {}
    };

    $('canvas#camera-view')
      .WebCodeCamJQuery(webCodeCamOptions)
      .data()
      .plugin_WebCodeCamJQuery.play();
  }
});
