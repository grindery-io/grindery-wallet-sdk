/**
 * @summary Get the app id from the script tag or window object
 * @returns {string} The app id
 */
export const getAppId = (): string => {
  let appId: string = '';
  const elements = document.querySelectorAll('[data-app-id]');
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const value = element.getAttribute('data-app-id');
    const src = element.getAttribute('src');
    const isGrinderySrc = src && src.includes('grindery-wallet-sdk');
    if (value && isGrinderySrc) {
      appId = value;
    }
  }
  if (window.Grindery?.appId) {
    appId = window.Grindery.appId;
  }
  return appId;
};
