var player;

// Custom Init - Happens only once
sap.ui.getCore().attachInit(function(data) {

    // Initialize YouTube API
    setTimeout(function() {
        //  Do something
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


        window.onYouTubeIframeAPIReady = function() {
            console.log('Youtube Loaded....');
        }

        // Place Holder
        // imgReplaceContent.setSrc('/youTube.png');
        imgReplaceContent.placeAt('player');

    }, 200);

});

// Load Video
function loadVideo() {
    // This function can be called on any event
    // Video ID from YouTube
    // E.g. Video URL - // https://www.youtube.com/watch?v=DyI1d3nvyTs
    //      Video ID = 'DyI1d3nvyTs'
    var videoID = 'DyI1d3nvyTs';

    // Destroy existing instance of Video Player -- Required when loading mulitple Videos in same video Player
    if (player) {
        if (player.g) {
            player.destroy();

        }
    }


    // Load Player with YouTube Video ID
    player = new window.YT.Player('player', {
        height: '390', // Video Player Height - can be varied
        width: '640', // Video Player Width - can be varied
        videoId: videoID, // Assign Video ID in runtime - variable
        events: {
            // Player events
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange

            // More events Refer- https://developers.google.com/youtube/iframe_api_reference#Events
        }
    });
}


// Playback Handlers
function playVideo() {
    player.playVideo();
}

function stopVideo() {
    player.stopVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function onPlayerReady(event) {
    // when Video Player is Ready, perform functions.. like AutoPlayback
    // event.target.playVideo();
}


function onPlayerStateChange(event) {
    // When status of Video Player Changes
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            // playing
            getPlayerProgress(event.data);
            break;
        case YT.PlayerState.ENDED:
            // Video End
            getPlayerProgress(event.data);
            break;
        case YT.PlayerState.PAUSED:
            // Paused
            getPlayerProgress(event.data);
            break;
        default:
            // code
    }

}


function getPlayerProgress(status) {
    // Get Timers from Video Player
    // player.getDuration() - Total Duration of Video
    // player.getCurrentTime() - Time Ellapsed in Video Player

    var timeRemaining = player.getDuration() - player.getCurrentTime();

    switch (status) {
        case YT.PlayerState.PLAYING:
            // playing
            console.log("Video Started Playing at - " + player.getCurrentTime());
            break;
        case YT.PlayerState.ENDED:
            // Video End
            console.log("Video Completed Playing");
            break;
        case YT.PlayerState.PAUSED:
            // Paused
            console.log("Video Paused Playing at - " + player.getCurrentTime());
            break;
        default:
            // code
    }
}