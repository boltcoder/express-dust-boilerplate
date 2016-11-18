/* Do not use this for client side*/

import ServerApiClient from '../helpers/utils/serverApiClient';
import config from '../config';

// const REGISTER_API = `${config.apiProto}://${config.apiHost}:${config.apiPort}/dazzler/v1/register`;
// const VERIFY_EMAIL_API = `${config.apiProto}://${config.apiHost}:${config.apiPort}/dazzler/v1/verifyEmail`;

// export const registerUser = formData =>
// encrypt(formData.password).then((encryptedPassword) => {
//   const x = formData;
//   x.password = encryptedPassword;
//   return (new ServerApiClient({ logFinder: 'REGISTER_USER' })).post(REGISTER_API, x);
// });

// export const verifyEmailRegistration = (options) => {
//   return (new ServerApiClient({ logFinder: 'VERIFY_EMAIL' }))
//     .get(VERIFY_EMAIL_API, options);
// };
