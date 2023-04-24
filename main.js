document.querySelector('#play').onclick = playPlayer;
document.querySelector('#pause').onclick = pausePlayer;
document.querySelector('#muted').onclick = mutedPlayer;
document.querySelector('#unmute').onclick = unmutePlayer;

let progress;
let duration;
let currentTime;

progress = document.querySelector('#progress')
progress.onclick = videoskroll;

    if (window.addEventListener) {
        window.addEventListener("message", msg_receive);
        } else {
        // IE8
        window.attachEvent("onmessage", msg_receive);
        }
        function msg_receive(msg) {
        if (msg && msg.data)
        if (msg.data.indexOf('Facecast_player') > -1) {
        var data = JSON.parse(msg.data);
        duration = data.duration
        currentTime = data.currentTime
        }
    }



function playPlayer() {
    window.frames[0].postMessage('{"frame":"fxv75u","exec":"play"}', 'https://facecast.net');
    window.frames[0].postMessage('{"frame":"fxv75u","exec":"unmute"}', 'https://facecast.net');
}

function pausePlayer() {
    window.frames[0].postMessage('{"frame":"fxv75u","exec":"pause"}', 'https://facecast.net');
}

function mutedPlayer() {
    window.frames[0].postMessage('{"frame":"fxv75u","exec":"mute"}', 'https://facecast.net');
}

function unmutePlayer() {
    window.frames[0].postMessage('{"frame":"fxv75u","exec":"play"}', 'https://facecast.net');
    window.frames[0].postMessage('{"frame":"fxv75u","exec":"unmute"}', 'https://facecast.net');
}

function seekPlayer() {
    let x = 50
    window.frames[0].postMessage('{"frame":"fxv75u","exec":"seek","seektime": ' + x + ' }', 'https://facecast.net');
}
function progressUpdate() {
    console.log(video.duration);
    console.log(video.currentTime)
    let d = duration;
    let c = currentTime
    progress.value = 100*c/d
}
function videoskroll() {
    let w = this.offsetWidth;
    let o = event.offsetX;
    this.value = 100*o/w;
    let x = duration*o/w;
    window.frames[0].postMessage('{"frame":"fxv75u","exec":"seek","seektime": ' + x + ' }', 'https://facecast.net');
}
