// Get the text field
const copyText = document.getElementById("myInput");

chrome.storage.session.get(["videoManifestUrl"]).then((result) => {
    console.log("=== read manifest url" + result.videoManifestUrl);
    copyText.value = result.videoManifestUrl;
});

const btnCopyText = document.getElementById("btnCopyText");
btnCopyText.onclick = () => {
    // Get the text field
    const copyText = document.getElementById("myInput");

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
