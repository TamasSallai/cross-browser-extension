import browser from 'webextension-polyfill'

browser.runtime
  .sendMessage('message from content script')
  .then((response) => console.log(response))
  .catch((error) => console.log(error))

console.log('Hello World')
