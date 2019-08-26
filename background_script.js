'use strict';

var tabs = {};

async function logSubject(request) {
  if (request && request.url && request.type === "main_frame") {
    try {
      let securityInfo = await browser.webRequest.getSecurityInfo(request.requestId, {});
      console.log(request);
      console.log(securityInfo);
      console.log(securityInfo.certificates[0].fingerprint.sha256);
      tabs[request.tabId] = {
        url: request.url,
        fingerprint: securityInfo.certificates[0].fingerprint.sha256,
        ip: request.ip
      }
    }
    catch(error) {
      console.error(error);
    }
  }
}
  
browser.webRequest.onHeadersReceived.addListener(
  logSubject,
  {urls: ["<all_urls>"]},
  ["responseHeaders", "blocking"]
);