/*--- variables ---*/
object-array songs; //array of objects holding song information, randomised
                    //element: clickable div to start song
                    //title: title of song
object currentPlayElements; /*object containing elements needed to check what is currently playing
                              currentPlayElements.title: title element
                              currentPlayElements.button: play button*/
int songindex; //index of current song
mutationobserver timewatcher;

int queueNext; //user dragged slider to end, on mouse up should check
               //if the time is still at the end and load next song
int mouseTracker; //if mouse button is pressed 0=up,1=down

/*--- functions ---*/
void songstart(); //hook operations when song begins
void nextsong(); //disconnect watcher and play random
void playrandom(); //play random song

/*--- one times ---*/
void deployShuffleButton(); //place shuffle button in dom
void startmouseTrack();
void deployNextButton();

/*--- utility functions ---*/
void randomiseArray(array array); //randomises array in place
void switchItem(int a,int b,array array); //switch 2 index in array used by randomisearray
bool confirmSong();