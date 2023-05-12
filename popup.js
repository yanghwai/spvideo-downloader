// Get the text field
const copyText = document.getElementById("myInput");
const videoTitle = document.getElementById("videoTitle");
const btnStart = document.getElementById("btnStart");
const btnCopyText = document.getElementById("btnCopyText");


chrome.storage.session.get(["videoManifestUrl"]).then((result) => {
    if (result?.videoManifestUrl) {
        console.log("=== read manifest url" + result.videoManifestUrl);
        copyText.value = result.videoManifestUrl;
    }
});

btnCopyText.onclick = () => {
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    const port = chrome.runtime.connectNative("com.huaiyang.spvideosniffer");
    port.onMessage.addListener(function (msg) {
        console.log("Received" + msg);
    });
    port.onDisconnect.addListener(function () {
        console.log("Disconnected");
    });
    port.postMessage({ jobUrl: copyText.value });
};

btnStart.onclick = () => {
    chrome.runtime.sendMessage({
        startWithUrl: copyText.value,
    });
};
