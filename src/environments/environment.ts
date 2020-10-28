// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebase from 'firebase';

export const environment = {
  production: false,
  firebase:{
      apiKey: "AIzaSyBJNxe0SPqkv23YuixOLewra7-QpmX3OUM",
      authDomain: "heimdall-9ba3e.firebaseapp.com",
      databaseURL: "https://heimdall-9ba3e.firebaseio.com",
      projectId: "heimdall-9ba3e",
      storageBucket: "heimdall-9ba3e.appspot.com",
      messagingSenderId: "685255586746",
      appId: "1:685255586746:web:2879b0754ee2d30033e383",
      measurementId: "G-7L858M4NBE"
    }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
