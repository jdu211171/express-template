import admin from 'firebase-admin';

import {serviceAccount} from "../cert_config";
// console.log(serviceAccount.client)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://react-native-notify-e8258.firebaseio.com',
});
export default admin.messaging();
