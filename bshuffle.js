class _bshuffle
{
    /*
        --- variables ---
        element-array songs: array of clickable divs used to start songs
    */
    constructor()
    {
        this.songs=document.querySelectorAll(".play_status");
    }

    //hook end time and begin observing current time for when it matches end time
    songstart()
    {
        var e_curtime=document.querySelector(".time_elapsed");
        var fintime=document.querySelector(".time_total").innerText;

        var timewatcher=new MutationObserver((m)=>{
            if (m[1].addedNodes[0].data==fintime)
            {
                console.log("%cbshuffle","color:#b578cc","song end");
                timewatcher.disconnect();
                this.playrandom();
            }
        });

        timewatcher.observe(e_curtime,{childList:true});
    }

    //play random song and remove it, also runs songstart operations
    playrandom()
    {
        if (!this.songs.length)
        {
            return;
        }

        var randomsong=Math.floor(Math.random()*this.songs.length);

        this.songs[randomsong].click();
        this.songs.splice(randomsong,0);
        this.songstart();
    }
}

var bshuffle=new _bshuffle;