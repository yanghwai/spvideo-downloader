const nativeClientAppId = "com.huaiyang.spvideosniffer";

function callback(details) {
    chrome.storage.session
        .set({
            videoManifestUrl: details.url,
        })
        .then(() => {
            console.log("=== saved to storage");
            chrome.action.setBadgeText({
                tabId: details.tabId,
                text: "1",
            });
        });
}

//https://southcentralus1-medias.svc.ms/transform/videomanifest?
const filter = {
    urls: ["https://*/transform/videomanifest?provider=*"],
};

chrome.webRequest.onBeforeRequest.addListener(callback, filter);

function handleForegroundMessage(request, sender, sendResponse) {
    if (request.startWithUrl) {
        chrome.runtime
            .sendNativeMessage(nativeClientAppId, {
                text: "hello from chrome ext",
            }, (msg) => {
                console.log("=== Ack from native:" + msg);
            })
    }
}

chrome.runtime.onMessage.addListener(handleForegroundMessage);
