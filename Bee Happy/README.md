# Bee Happy!

This web app determines if a text entry is happy, sad or unknown based on a predetermined set of keywords and displays this on a scale.

## Design and Implementation

Bee Happy is a reading and writing game for children aged 4-6. The user is asked to replace all sad words with happy words from a given selection to complete the game. These are randomly ordered so that it is up to the user to identify the correct words to use.

The target age group is reflected in the design of the page, with fun and bright colours. Progression in the game is viewed by a change in the background colour and a character's (Bumble Bee) expression. Bumble Bee is used as a stimulus for the user to identify with, making it easy for the target user to distinguish a happy story from a sad story. Alongside the character is a more specific scale, which is displayed visually (rather than numerically) in the form of a progress bar to make progression clear throughout the game. The user will be able to see when they have successfully completed the game when the progress bar is entirely green. 

Bee Happy has a responsive layout for desktop and mobile clients. The desktop layout has a main content area of width 620px with large surrounding margins for background visibility and hence impact of changing background colour. The content area for a display smaller than 620px reduces to 320px, appropriate for small displays (such as iPhone 4), while retaining visibility of the background colour.


## How it works

A list of happy and sad words that the app recognises are defined in initialisation.

The user input is interpretted as a string, punctuation in the string is removed and all text is made lowercase. The string is finally split by whitespace characters into a list of each word.

I have used `indexOf()` to find whether a word given by the user is an element of happyWords or sadWords. The function `getHappySadCount()` counts how many words in the user input belongs to happyWords or sadWords and returns these values as an object.

I have chosen to use a metric to score the text, and used a threshold to determine if there are 50% more happy words than sad words, or vice versa. The metric I used to assign a value on a scale was:

```
function calculate(happy, sad) {
	if (happy != sad) {
		return (happy - sad) / (happy + sad) ;
	} else {
        return 0;
	}
}
```

it gives a score between ±1 with thresholds of ±0.2. The `calculate()` function takes the number of happy words and sad words and calculates the fraction that one value is higher than the other.

The `updatePage()` function is called when an input in the textbox occurs and changes the values returned by `getHappySadCount()`. `updatePage()` changes the colour of the background, the width of the progress bar and the Bee's expression depending on the value returned by `calculate()`.