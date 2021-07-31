// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// import firebase from 'firebase';

export const environment = {
  production: false,
   SERVER_URL : 'http://ec2-65-0-91-147.ap-south-1.compute.amazonaws.com/api',
  IMAGE_URL : 'http://ec2-65-0-91-147.ap-south-1.compute.amazonaws.com/',
  
   firebase : {
    apiKey: "AIzaSyCIgF0p5HldPhaakG_rluiaj0ZTanRQaSk",
    authDomain: "homease-5858.firebaseapp.com",
    databaseURL: "https://homease-5858.firebaseio.com",
    projectId: "homease-5858",
    storageBucket: "homease-5858.appspot.com",
    messagingSenderId: "364586467493",
    appId: "1:364586467493:web:d93c98be8c7599439f0d4c",
    measurementId: "G-20XRCGWCKG"
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
