document.getElementById('myHeading').style.color = 'red';
/*
Get the background page to access the rootCertStats object
*/
function createQRCode(tabs) {
    console.log("logTabs called");
    let currentTab = tabs[0];
    const backgroundPage = browser.extension.getBackgroundPage();
    console.log(backgroundPage.tabs);
    console.log(currentTab);
    let tabId = currentTab.id;
    let data = backgroundPage.tabs[tabId];
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "https://pushvalidator.com?fingerprint="+data.fingerprint+"&ip="+data.ip+"&url="+data.url,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
  }

  let tabRequest = browser.tabs.query({active: true, currentWindow: true});
  tabRequest.then(createQRCode);
