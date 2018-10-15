const { readFileSync, writeFileSync } = require('fs'); // tslint:disable-line
const { join } = require('path'); // tslint:disable-line

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const config = readFileSync(join(__dirname, `src/config/${env}.config.json`));
writeFileSync(join(__dirname, 'src/config/config.json'), config);

const app = JSON.parse(readFileSync(join(__dirname, 'app.json')));
app.expo.name = isProd ? 'making sense' : `${env} making sense`;
app.expo.ios.bundleIdentifier = app.expo.android.package = isProd ? 'com.making.sense' : `com.making.sense.${env}`;
writeFileSync(join(__dirname, 'app.json'), JSON.stringify(app, null, 2));

// {
//     "expo": {
//       "name": "development making sense RN seed",
//       "version": "0.1.0",
//       "sdkVersion": "27.0.0",
//       "ios": {
//         "bundleIdentifier": "com.making.sense.rn.seed.development"
//       },
//       "android": {
//         "package": "com.making.sense.rn.seed.development"
//       },
//       "icon": "./icon.png",
//       "packagerOpts": {
//         "sourceExts": [
//           "ts",
//           "tsx"
//         ],
//         "transformer": "node_modules/react-native-typescript-transformer/index.js"
//       },
//       "splash": {
//         "image": "./src/assets/images/splash.png"
//       },
//       "privacy": "unlisted",
//       "updates": {
//         "enabled": true,
//         "checkAutomatically": "ON_ERROR_RECOVERY",
//         "fallbackToCacheTimeout": 0
//       }
//     }
//   }