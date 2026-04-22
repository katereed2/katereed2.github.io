const bow = document.getElementById("bow"); //gets bow eleemtn so can roate whe neecsary
const arrow = document.getElementById("arrow"); //gest arrow element so it can be moved backwards
const handle = document.getElementById("handle"); //gets heart handle for lcick and drag
const currentVolume = document.getElementById("currentVolume"); //gets volume number
const setButton = document.getElementById("setButton"); //gets button element to confrim the volume

let dragging = false; //tracks if the user is curently dragging the handle
let startX = 0; //stores mouse position of strat of drag
let pull = 0; //stores pull distance of drag
let volume = 50; //stroes current volume value

handle.addEventListener("pointerdown", startDrag); //starts dragging when the user presses down
handle.addEventListener("pointermove", drag); //runs while the user moves the handle
handle.addEventListener("pointerup", releaseArrow); //runs when the user relases the handle

function startDrag(event) {
  dragging = true;//turn on drag
  arrow.classList.remove("arrowHidden");
  startX = event.clientX; //saves the starting posititon
  handle.setPointerCapture(event.pointerId); //track the pointer 
}

function drag(event) {
  pull = startX - event.clientX;//measures left distsance that the user pulled from the startiing point
  if (pull < 0) { //canot move teh arrow forward/adjust
    pull = 0;
  }
  if (pull > 220) { //cannot pull it infinitly backwards
    pull = 220;
  }
  bow.style.transform = `rotate(${-pull / 8}deg)`; //tilts bow nroe as user pulls more back
  arrow.style.transform = `translateX(${-pull}px)`; //moves arrow backward 
  handle.style.transform = `translateX(${-pull}px) rotate(-45deg)`; //mpved yhe heartw it the arrow

  volume = Math.round((pull / 220) * 100);//converts distance into volume percentage
}

function releaseArrow() {
  dragging = false;
  const randomMistake = Math.floor(Math.random() * 15) - 7; //math to just randomize the volume slisghtly more, literally no actual math just messes with it a bit
  volume = volume + randomMistake;

  if (volume < 0) { //volume cannot go below 0
    volume = 0;
  }
  if (volume > 100) { //voluem cabnot go above 100 
    volume = 100;
  }

  bow.style.transform = "rotate(8deg)"; //makes thebow snap after release to add more confusion
  arrow.style.transform = "translateX(420px)"; 
  handle.style.transform = "translateX(35px) rotate(-45deg)";

  setTimeout(() => {
    arrow.classList.add("arrowHidden");
  }, 160); //hices rrow to appear as if it has flown away

  setTimeout(resetBow, 180);
}

function resetBow() { 
  bow.style.transform = "rotate(0deg)"; //puts the bow back to its nromal posittion by roating
  arrow.style.transform = "translateX(0px)"; //puts the arrow back to its nomal posititon
  handle.style.transform = "translateX(0px) rotate(-45deg)"; //puts the heart back ti uts position
}

setButton.addEventListener("click", () => { //confirms the volume only after the user actually clicks the button to do so
  currentVolume.textContent = `${volume}%`; //updated the volume displayed
  document.body.style.background = getVolumeColor(volume); //changed the bg color based on volume
  arrow.classList.remove("arrowHidden");
});

function getVolumeColor(volume) { //choose a background color based on the volume level
  if (volume < 25) {
    return "#dbeafe";
  }
  if (volume < 50) {
    return "#dcfce7";
  }
  if (volume < 75) {
    return "#fef3c7";
  }
  return "#fee2e2";
}
