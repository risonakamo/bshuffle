/*--- variables ---*/
//array of objects holding song information, gets randomised
object-array songs {
    element element; //clickable div to start song
    string title; //title of song
};
//object containing elements needed to check what is currently playing
object currentPlayElements {
    element button; //play button
    element title; //element containing title
};
int songindex; //index of current song
mutationobserver timewatcher;

int queueNext; //user dragged slider to end, on mouse up should check
               //if the time is still at the end and load next song
int mouseTracker; //if mouse button is pressed 0=up,1=down

/*--- functions ---*/
void songstart(); //hook operations when song begins
void nextsong(); //disconnect watcher and play random
void playrandom(); //play random song
void endPlay();

/*--- one times ---*/
void deployShuffleButton(); //place shuffle button in dom
void startmouseTrack();
void deployNextButton();

/*--- utility functions ---*/
void randomiseArray(array array); //randomises array in place
void switchItem(int a,int b,array array); //switch 2 index in array used by randomisearray
bool confirmSong(); //return true if correct song is PLAYING, false otherwise