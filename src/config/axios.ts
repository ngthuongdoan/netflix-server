import { GLOBAL } from '../constants/global';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from './config';
import app from '../app';

function isExcluded(list: Array<string>, url: string): boolean {
  let validate = true;

  list.forEach((item) => {
    if (item.indexOf(url) > -1) {
      validate = false;
      return;
    }
  });

  return validate;
}
axios.defaults.baseURL = config.TMDB.url;
axios.defaults.params = { api_key: config.TMDB.apiKey };

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('🚀 ---------------------------------------------');
    console.log('🚀 ~ file: axios.ts ~ line 23 ~ config', config);
    console.log('🚀 ---------------------------------------------');

    if (config.url) {
      const token = app.get(GLOBAL.TOKEN);
      if (token && config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Edit response config
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalConfig = error.config;
//     const customConfig: AxiosRequestConfig & { _retry?: boolean } = {
//       ...originalConfig,
//     };

//     // Check if this is unauthorized error
//     // then get new access token using refresh token
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !customConfig._retry && // To avoid infinite loop if wrong refresh token
//       originalConfig.url !== REFRESH_URL // Do not refresh if the request is already refresh request
//     ) {
//       if (typeof window !== 'undefined') {
//         customConfig._retry = true;
//         const refreshToken = Cookie.get(COOKIE_CONFIG.refreshKey);
//         if (refreshToken) {
//           try {
//             const refreshResponse = await refreshTokenAPI(refreshToken);
//             const {
//               AuthenticationResult: { IdToken, ExpiresIn },
//             } = refreshResponse.data;

//             Cookie.set(COOKIE_CONFIG.accessKey, IdToken, {
//               expires: new Date(new Date().getTime() + ExpiresIn * 1000),
//               domain: COOKIE_CONFIG.domain,
//             });

//             if (originalConfig.headers) {
//               originalConfig.headers.Authorization = `Bearer ${IdToken}`;
//             }

//             return await new Promise((resolve, reject) => {
//               axios
//                 .request(originalConfig)
//                 .then((res) => resolve(res))
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 .catch((err: any) => reject(err));
//             });
//           } catch (e) {
//             Cookie.remove(COOKIE_CONFIG.accessKey, {
//               domain: COOKIE_CONFIG.domain,
//             });
//           }
//         } else {
//           Cookie.remove(COOKIE_CONFIG.accessKey, {
//             domain: COOKIE_CONFIG.domain,
//           });
//           Cookie.remove(COOKIE_CONFIG.refreshKey, {
//             domain: COOKIE_CONFIG.domain,
//           });
//         }
//       }
//     } else if (error.response && error.response.status === 403) {
//     } else {
//       const errorMessage = generateError(error);
//       console.log(errorMessage);

//       if (typeof window !== 'undefined') {
//         Swal.fire({
//           icon: 'error',
//           title: errorMessage.code || 'ERROR!',
//           text: errorMessage.message,
//           confirmButtonText: t('MODAL.OK'),
//           cancelButtonText: t('MODAL.OK'),
//         });
//       }
//     }

//     return Promise.reject(error);
//   }
// );
