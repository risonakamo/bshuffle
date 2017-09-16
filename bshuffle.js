class _bshuffle
{
    /*
        --- variables ---
        element-array songs: array of clickable divs used to start songs. not a nodelist.
        int songindex
        mutationobserver timewatcher
    */
    constructor()
    {
        this.songs=[];
        this.songindex=0;
        var e_songs=document.querySelectorAll(".play_status");

        for (var x=0,l=e_songs.length;x<l;x++)
        {
            this.songs.push(e_songs[x]);
        }

        this.randomiseArray(this.songs);

        this.playrandom();
    }

    //hook end time and begin observing current time for when it matches end time
    songstart()
    {
        var e_curtime=document.querySelector(".time_elapsed");
        var fintime=document.querySelector(".time_total").innerText;

        console.log("%cbshuffle","color:#FF4A74","playing song with time: ",fintime);

        this.timewatcher=new MutationObserver((m)=>{
            if (m[1].addedNodes[0].data==fintime)
            {
                console.log("%cbshuffle","color:#FF4A74","song end");
                this.timewatcher.disconnect();
                this.playrandom();
            }
        });

        this.timewatcher.observe(e_curtime,{childList:true});
    }

    //play random song, increment songindex
    playrandom()
    {
        if (this.songindex>=this.songs.length)
        {
            return;
        }

        if (this.timewatcher)
        {
            this.timewatcher.disconnect();
        }

        this.songs[this.songindex].click();
        this.songindex++;
        this.songstart();
    }

    randomiseArray(array)
    {
        for (var x=array.length;x>0;x--)
        {
            this.switchItem(Math.floor(Math.random()*x),x-1,array);
        }
    }

    switchItem(a,b,array)
    {
        var t=array[a];
        array[a]=array[b];
        array[b]=t;
    }
}

var bshuffle=new _bshuffle;