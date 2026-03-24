// Complete variable definitions and random functions

const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Raw text strings

const characters = ["Willy the Goblin","Big Daddy","Father Christmas"];
const places = ["the soup kitchen", "Disneyland", "the White House"];
const events = ["spontaneously combusted","melted into a puddle on the sidewalk","turned into a slug and slithered away"];

// Partial return random string function

function returnRandomStoryString() {
    const randomCharacter = randomValueFromArray(characters);
    const randomPlace = randomValueFromArray(places);
    const randomEvent = randomValueFromArray(events);

    let storyText = `${randomCharacter} was getting ready for a big volleyball match at ${randomPlace}. The gym was loud, the crowd was cheering, and nerves were high. Right in the middle of the game, ${randomEvent}. Even so, ${randomCharacter} stayed focused and helped her team win the final point.`;

  return storyText;
}

// Event listener and partial generate function definition

generateBtn.addEventListener("click", generateStory);

function generateStory() {
    let newStory = returnRandomStoryString();
  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300 / 14)} stone`;
    const temperature = `${Math.round((94 - 32) * (5 / 9))} Celsius`;
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 Farenheit", temperature);
  }

  // TODO: replace "" with the correct expression
  story.textContent = newStory;
  story.style.visibility = "visible";
}