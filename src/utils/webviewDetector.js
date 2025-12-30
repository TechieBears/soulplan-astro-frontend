/**
 * Detects if the page is being viewed in a React Native WebView
 * @returns {boolean} true if in webview, false otherwise
 */
export const isWebView = () => {
  // Check for React Native WebView injection
  if (window.ReactNativeWebView) {
    return true;
  }

  // Check user agent for common webview patterns
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // React Native WebView user agents often contain these patterns
  const webviewPatterns = [
    'wv', // Android WebView
    'WebView', // iOS WebView
    'ReactNative', // React Native WebView
  ];

  const isWebViewUserAgent = webviewPatterns.some(pattern =>
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );

  // Check URL parameters (if app passes ?webview=true)
  const urlParams = new URLSearchParams(window.location.search);
  const isWebViewParam = urlParams.get('webview') === 'true';

  // Check if standalone mode (PWA) - if not standalone and has webview indicators, likely webview
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone === true;

  return isWebViewUserAgent || isWebViewParam || (!isStandalone && window.ReactNativeWebView !== undefined);
};
