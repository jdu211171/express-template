import admin from 'firebase-admin';

const serviceAccount = require('../google-services.json'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://react-native-notify-e8258.firebaseio.com', 
});

module.exports = admin.messaging();