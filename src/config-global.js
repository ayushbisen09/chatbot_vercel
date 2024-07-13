import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export const CONFIG = {
  site: {
    name: 'Minimals',
    serverUrl: process.env.REACT_APP_SERVER_URL ?? '',
    assetURL: process.env.REACT_APP_ASSET_URL ?? '',
    basePath: process.env.REACT_APP_BASE_PATH ?? '',
    version: packageJson.version,
  },
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'jwt',
    skip: true,
    redirectPath: paths.dashboard.root,
  },
  /**
   * Mapbox
   */
  mapbox: {
    apiKey: process.env.REACT_APP_MAPBOX_API_KEY ?? '',
  },
  /**
   * Firebase
   */
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? '',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.REACT_APP_FIREBASE_APPID ?? '',
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ?? '',
  },
  /**
   * Amplify
   */
  amplify: {
    userPoolId: process.env.REACT_APP_AWS_AMPLIFY_USER_POOL_ID ?? '',
    userPoolWebClientId: process.env.REACT_APP_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID ?? '',
    region: process.env.REACT_APP_AWS_AMPLIFY_REGION ?? '',
  },
  /**
   * Auth0
   */
  auth0: {
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID ?? '',
    domain: process.env.REACT_APP_AUTH0_DOMAIN ?? '',
    callbackUrl: process.env.REACT_APP_AUTH0_CALLBACK_URL ?? '',
  },
  /**
   * Supabase
   */
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL ?? '',
    key: process.env.REACT_APP_SUPABASE_ANON_KEY ?? '',
  },
};
