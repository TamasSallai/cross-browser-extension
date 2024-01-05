import browser from 'webextension-polyfill'

browser.runtime.onMessage.addListener(
  (message, _, sendResponse: (response: any) => void) => {
    console.log(message)

    sendResponse('response from background script')
  }
)
