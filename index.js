const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const video = document.getElementById("html-video-object");

video.addEventListener( "loadedmetadata", function (e) {
    width = this.videoWidth;
    height = this.videoHeight;
    ipcRenderer.send("getVideoWH",width,height);
    console.log(width + "  " + height);
}, false );
