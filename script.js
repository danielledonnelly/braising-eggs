document.addEventListener("DOMContentLoaded", function () {
  const egg = document.getElementById("egg");
  const trashCan = document.getElementById("trash-can");
  const tutorialText = document.getElementById("tutorial-text");
  const pot = document.getElementById("pot");
  const firePot = document.getElementById("fire-pot");
  const fireExtinguisher = document.getElementById("fire-extinguisher");

  let crackStage = 0;
  let stage = 0;
  const crackImages = [
      'images/egg.png',
      'images/egg-crack1.png',
      'images/egg-crack2.png',
      'images/egg-crack3.png',
      'images/egg-crack4.png',
      'images/egg-cracked.png',
      'images/egg-cracked-sad.png'
  ];

  egg.addEventListener("click", function () {
      if (stage === 0) {
          crackEgg();
      }
  });

  egg.addEventListener("dragstart", dragStart);
  trashCan.addEventListener("dragover", dragOver);
  trashCan.addEventListener("drop", dropInTrash);
  trashCan.addEventListener("click", showPot);
  pot.addEventListener("click", igniteFire);

  function dragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
  }

  function dragOver(event) {
      event.preventDefault();
  }

  function dropInTrash(event) {
      event.preventDefault();
      egg.style.display = "none";
      tutorialText.textContent = "Great work! Click the can to take out the trash.";
      egg.draggable = false;
      stage = 1;
  }

  function showPot() {
      if (tutorialText.textContent === "Great work! Click the can to take out the trash.") {
          trashCan.classList.add("hidden");
          egg.src = crackImages[0];
          egg.style.display = "block";
          crackStage = 0;
          tutorialText.textContent = "Now, without breaking anything this time, drag the egg to the pot below.";
          pot.classList.remove("hidden");
          egg.draggable = true;
          egg.removeEventListener("click", crackEgg);
          pot.addEventListener("dragover", dragOver);
          pot.addEventListener("drop", dropInPot);
          stage = 2;
      }
  }

  function dropInPot(event) {
      event.preventDefault();
      egg.style.zIndex = "0";
      egg.style.position = "absolute";
      egg.style.top = "70%";
      egg.style.left = "50%";
      egg.style.transform = "translate(-50%, -50%)";
      tutorialText.textContent = "Well done! Now click the pot to start braising.";
      egg.draggable = false;
      stage = 3;
  }

  function igniteFire() {
      if (stage === 3) {
          pot.classList.add("hidden");
          firePot.classList.remove("hidden");
          tutorialText.textContent = "Uh oh, that's not good! Put out the fire!";
          fireExtinguisher.classList.remove("hidden");
          stage = 4;
      }
  }

  fireExtinguisher.addEventListener("dragstart", dragStart);
  firePot.addEventListener("dragover", dragOver);
  firePot.addEventListener("drop", extinguishFire);

  function extinguishFire(event) {
      event.preventDefault();
      if (stage === 4) {
          fireExtinguisher.style.display = "none";
          firePot.classList.add("hidden");
          pot.classList.remove("hidden");
          tutorialText.textContent = "The fire is out. You can proceed with braising now.";
          stage = 5;
      }
  }

  function crackEgg() {
      if (stage === 0 && crackStage < crackImages.length - 1) {
          crackStage++;
          egg.src = crackImages[crackStage];
          if (crackStage < crackImages.length - 2) {
              const crackSound = new Audio('sounds/crack.wav');
              crackSound.play();
          }
          if (crackStage === crackImages.length - 2) {
              tutorialText.textContent = "Whoops! It turns out you're not supposed to crack an egg to braise it properly.";
              egg.draggable = false;
          }
          if (crackStage === crackImages.length - 1) {
              tutorialText.textContent = "Throw your broken egg in the trash.";
              egg.draggable = true;
              trashCan.classList.remove("hidden");
          }
      }
  }
});
