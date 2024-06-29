const API =
  import.meta.env.VITE_DEV_ENV === "true"
    ? import.meta.env.VITE_DEV_API_URL
    : import.meta.env.VITE_APP_API_URL;
const MEDIA =
  import.meta.env.VITE_DEV_ENV === "true"
    ? import.meta.env.VITE_DEV_MEDIA_URL
    : import.meta.env.VITE_APP_MEDIA_URL;

export { API, MEDIA };
