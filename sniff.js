const nativeClientAppId = "com.huaiyang.spvideosniffer";

function callback(details) {
    console.log("=== manifest url is: " + details.url);
    chrome.storage.session
        .set({
            videoManifestUrl: details.url,
        })
        .then(() => {
            console.log("=== saved to storage");
            chrome.action.setBadgeText({
                text: "1"
            })
        });
}

//https://southcentralus1-medias.svc.ms/transform/videomanifest?
const filter = {
    urls: ["https://*/transform/videomanifest?provider=*"],
};

chrome.webRequest.onBeforeRequest.addListener(callback, filter);
console.log("====!!!! start");

function handleMessage(request, sender, sendResponse) {
    console.log(`A content script sent a message: ${JSON.stringify(request)}`);
    //const port = chrome.runtime.connectNative(nativeClientAppId);
    if (request.startWithUrl) {
        chrome.runtime
            .sendNativeMessage(nativeClientAppId, {
                text: "hello from chrome ext",
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

chrome.runtime.onMessage.addListener(handleMessage);
