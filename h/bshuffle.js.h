/*--- variables ---*/
element-array songs; //array of clickable divs used to start songs. not a nodelist.
int songindex;
mutationobserver timewatcher;

int queueNext; //user dragged slider to end, on mouse up should check
               //if the time is still at the end and load next song
int mouseTracker; //if mouse button is pressed 0=up,1=down

/*--- functions ---*/
void songstart(); //hook operations when song begins
void nextsong(); //disconnect watcher and play random
void playrandom(); //play random song
void deployShuffleButton();

void mouseTrack();

/*--- utility functions ---*/
void randomiseArray(array array); //randomises array in place
void switchItem(int a,int b,array array); //switch 2 index in array used by randomisearray