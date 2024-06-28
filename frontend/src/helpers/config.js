let API = "";
let MEDIA = "";

if (import.meta.env.VITE_DEV_ENV === "True") {
  API = import.meta.env.VITE_DEV_API_URL;
  MEDIA = import.meta.env.VITE_DEV_MEDIA_URL;
} else {
  API = import.meta.env.VITE_APP_API_URL;
  MEDIA = import.meta.env.VITE_APP_MEDIA_URL;
}

console.log(API, MEDIA, import.meta.env.VITE_DEV_ENV);

export { API, MEDIA };
