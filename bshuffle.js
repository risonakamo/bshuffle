class _bshuffle
{
    constructor()
    {
        this.songs=[];
        this.songindex=-1;
        this.mouseTrack=0;

        this.currentPlayElements={
            title:document.querySelector("#trackInfoInner span.title"),
            button:document.querySelector(".playbutton")
        };

        var e_songs=document.querySelectorAll(".play_status");
        var e_songtitles=document.querySelectorAll("#track_table .title a span");

        for (var x=0,l=e_songs.length;x<l;x++)
        {
            this.songs.push({element:e_songs[x],title:e_songtitles[x].innerText});
        }

        this.randomiseArray(this.songs);

        this.deployShuffleButton();
        this.startmouseTrack();
    }

    //hook end time and begin observing current time for when it matches end time
    songstart()
    {
        var e_curtime=document.querySelector(".time_elapsed");
        var fintime=document.querySelector(".time_total").innerText;

        console.log("%cbshuffle","color:#FF4A74",
            `playing song ${this.songindex+1} / ${this.songs.length}: ${this.songs[this.songindex].title} with time: `,fintime);

        this.timewatcher=new MutationObserver((m)=>{
            if (m[1].addedNodes[0].data==fintime && this.mouseTrack==0)
            {
                this.nextsong();
            }

            else if (m[1].addedNodes[0].data==fintime && this.mouseTrack!=0)
            {
                this.queueNext=1;
            }
        });

        this.timewatcher.observe(e_curtime,{childList:true});

        setTimeout(()=>{
            this.confirmSong((res)=>{
                if (!res)
                {
                    this.playrandom(1);
                }
            });
        },500);

    }

    nextsong()
    {
        console.log("%cbshuffle","color:#FF4A74","song end");

        if (this.songindex<this.songs.length)
        {
            this.songs[this.songindex].element.parentElement
                .parentElement.nextElementSibling.firstElementChild.innerText="✔.";
        }

        this.timewatcher.disconnect();
        this.playrandom();
    }

    //play random song, increment songindex
    playrandom(retry=0)
    {
        if (this.songindex>=this.songs.length-1)
        {
            console.log("%cbshuffle","color:#FF4A74","no more songs");
            this.endPlay();
            return;
        }

        if (this.timewatcher)
        {
            this.timewatcher.disconnect();
        }

        if (!retry)
        {
            this.songindex++;
        }

        this.songs[this.songindex].element.click();

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

    deployShuffleButton()
    {
        var playbutton=document.querySelector(".playbutton");
        var shufflebutton=playbutton.cloneNode();
        playbutton.parentElement.appendChild(shufflebutton);

        shufflebutton.addEventListener("click",(e)=>{
            this.playrandom();
            this.deployNextButton();
            shufflebutton.parentElement.removeChild(shufflebutton);
        });
    }

    startmouseTrack()
    {
        document.body.addEventListener("mousedown",(e)=>{
            this.mouseTrack++;
        });

        document.body.addEventListener("mouseup",(e)=>{
            this.mouseTrack--;

            if (this.queueNext)
            {
                this.queueNext=0;

                if (document.querySelector(".time_elapsed").innerText
                    ==document.querySelector(".time_total").innerText)
                {
                    this.nextsong();
                }
            }
        });

        document.querySelector(".progbar .thumb").addEventListener("mousedown",(e)=>{
            this.mouseTrack++;
        });
    }

    deployNextButton()
    {
        var originalNext=document.querySelector(".next_cell");
        var shuffleNext=originalNext.cloneNode(true);

        shuffleNext.addEventListener("click",(e)=>{
            this.nextsong();
        });

        originalNext.style["display"]="none";
        originalNext.parentElement.children[1].style["display"]="none";
        originalNext.parentElement.appendChild(shuffleNext);
    }

    confirmSong(callback)
    {
        if (this.songs[this.songindex].title!=this.currentPlayElements.title.innerText)
        {
            console.log("%cbshuffle","color:#FF4A74",
                "desynced. current song:",
                this.currentPlayElements.title.innerText,
                ", correct song:",
                this.songs[this.songindex].title);

            callback(false);
            return;
        }

        if (this.currentPlayElements.button.classList.contains("busy"))
        {
            setTimeout(()=>{
                this.confirmSong(callback);
            },500);
            return;
        }

        if (!this.currentPlayElements.button.classList.contains("playing"))
        {
            callback(false);
            return;
        }

        callback(true);
        return;
    }

    endPlay(check=0)
    {
        console.log(`end play check ${check}`);
        if (this.currentPlayElements.button.classList.contains("playing"))
        {
            this.currentPlayElements.button.click();
        }

        else if (this.currentPlayElements.button.classList.contains("busy"))
        {
            setTimeout(()=>{
                this.endPlay();
            },500);
        }

        if (check<3)
        {
            setTimeout(()=>{
                this.endPlay(check+1);
            },1000);
        }
    }
}

var bshuffle=new _bshuffle;