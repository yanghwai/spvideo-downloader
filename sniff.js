function callback(details) {
    console.log("=== manifest url is: " + details.url);
    chrome.storage.session.set({
        "videoManifestUrl": details.url
    }).then(() => {
        console.log("=== saved to storage");
    })
};

const filter = {
    urls: ["https://*/transform/videomanifest?provider=*"],
};

chrome.webRequest.onBeforeRequest.addListener(callback, filter);
console.log("====!!!! start");

//https://southcentralus1-medias.svc.ms/transform/videomanifest?