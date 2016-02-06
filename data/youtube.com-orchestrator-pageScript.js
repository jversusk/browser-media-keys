/**
 * MediaKeys namespace.
 */
if (typeof MediaKeys == "undefined") var MediaKeys = {};

MediaKeys.init = function() {
    var player = document.querySelector('div.html5-video-player');
    var pageDomain = window.location.origin;
    var PlayerStates = {
        unstarted: -1,
        ended: 0,
        playing: 1,
        paused: 2
    };
    var playVideo = function () {
        player.playVideo();
        window.postMessage("Play", pageDomain);
    };
    var pauseVideo = function () {
        player.pauseVideo();
        window.postMessage("Pause", pageDomain);
    };

    window.addEventListener("message", function (event) {
        switch (event.data) {
            case "MediaPlayPause":
                var status = player.getPlayerState();
                if (status != PlayerStates.playing) {
                    playVideo();
                }
                else {
                    pauseVideo();
                }
                break;

            case "MediaPause":
                pauseVideo();
                break;

            case "MediaPlay":
                playVideo();
                break;

            case "MediaTrackNext":
                player.nextVideo();
                window.postMessage("Next", pageDomain);
                break;

            case "MediaTrackPrevious":
                player.previousVideo();
                window.postMessage("Previous", pageDomain);
                break;

            case "MediaStop":
                player.stopVideo();
                window.postMessage("Stop", pageDomain);
                break;
        }
    });
};

MediaKeys.init();