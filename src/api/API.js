import { getBaseUrl } from '@/util';
const doc = import.meta.env.VITE_APP_MICRO_SERVICE_DOC_PATH;
const tpm = import.meta.env.VITE_APP_MICRO_SERVICE_BASE_PATH;
const auth = import.meta.env.VITE_APP_MICRO_SERVICE_AUTH_PATH;
export default {
  uploadFile: `${getBaseUrl()}${doc}/put`,
  download: `${getBaseUrl()}${doc}/get/`
};
