class _bshuffle
{
    /*
        --- variables ---
        element-array songs: array of clickable divs used to start songs. not a nodelist.
        mutationobserver timewatcher
    */
    constructor()
    {
        this.songs=[];
        var e_songs=document.querySelectorAll(".play_status");

        for (var x=0,l=e_songs.length;x<l;x++)
        {
            this.songs.push(e_songs[x]);
        }

        this.playrandom();
    }

    //hook end time and begin observing current time for when it matches end time
    songstart()
    {
        var e_curtime=document.querySelector(".time_elapsed");
        var fintime=document.querySelector(".time_total").innerText;

        console.log(fintime);

        this.timewatcher=new MutationObserver((m)=>{
            if (m[1].addedNodes[0].data==fintime)
            {
                console.log("%cbshuffle","color:#b578cc","song end");
                this.timewatcher.disconnect();
                this.playrandom();
            }
        });

        this.timewatcher.observe(e_curtime,{childList:true});
    }

    //play random song and remove it, also runs songstart operations
    playrandom()
    {
        if (!this.songs.length)
        {
            return;
        }

        if (this.timewatcher)
        {
            this.timewatcher.disconnect();
        }

        console.log(this.songs);
        var randomsong=Math.floor(Math.random()*this.songs.length);

        this.songs[randomsong].click();
        this.songs.splice(randomsong,1);
        this.songstart();
    }
}

var bshuffle=new _bshuffle;