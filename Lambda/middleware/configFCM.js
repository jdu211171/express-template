"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const cert_config_1 = __importDefault(require("../cert_config"));
// console.log(serviceAccount.client)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(cert_config_1.default),
    databaseURL: 'https://react-native-notify-e8258.firebaseio.com',
});
exports.default = firebase_admin_1.default.messaging();
