/*--- variables ---*/
element-array songs; //array of clickable divs used to start songs. not a nodelist.
int songindex;
mutationobserver timewatcher;

/*--- functions ---*/
void songstart(); //hook operations when song begins
void playrandom(); //play random song
void deployShuffleButton();

/*--- utility functions ---*/
void randomiseArray(array array); //randomises array in place
void switchItem(int a,int b,array array); //switch 2 index in array used by randomisearray