let player;
let currentPlay = 0;


var seth = prompt("請輸入播放器長度", "480");
var setw = prompt("請輸入播放器寬度", "900");
//YouTube API Ready
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player",
    {
        
        height:seth,
        width:setw,
        videoId:playList[currentPlay],
        playerVars:
        {
            autoplay:0, //是否自動撥放
            controls:0, //是否顯示控制項
            start:playTime[currentPlay][0],//開始秒數
            end:playTime[currentPlay][1],//結束秒數
            iv_load_policy:3
        },
        events:
        {
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange
        }
        });
        
}
//YouTube Player Ready
function onPlayerReady(event){
    $("#playButton").on("click",function()
    {
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    }
    );
        
}
//Player State Change
function onPlayerStateChange(event){
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1])
    {
        if(currentPlay<playList.length-1)
        {
            currentPlay++;
            player.loadVideoById({
            videoId:playList[currentPlay],
            startSeconds:playTime[currentPlay][0],
            endSeconds:playTime[currentPlay][1],
            suggestedQuality:"large"
        });
        }
        else
        {
            currentPlay=0;
            player.cueVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }
    }
            $("h2").text(player.getVideoData().title);
        
}