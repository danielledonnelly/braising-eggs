// script.js
document.addEventListener("DOMContentLoaded", function () {
  const egg = document.getElementById("egg");
  const trashCan = document.getElementById("trash-can");
  const tutorialText = document.getElementById("tutorial-text");
  const pot = document.getElementById("pot");

  let crackStage = 0;
  const crackImages = [
      'images/egg.png',
      'images/egg-crack1.png',
      'images/egg-crack2.png',
      'images/egg-crack3.png',
      'images/egg-crack4.png',
      'images/egg-crack5.png',
      'images/egg-cracked.png',
      'images/egg-cracked-sad.png'
  ];

  egg.addEventListener("click", function () {
      if (crackStage < crackImages.length - 1) {
          crackStage++;
          egg.src = crackImages[crackStage];
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
  });

  egg.addEventListener("dragstart", dragStart);
  trashCan.addEventListener("dragover", dragOver);
  trashCan.addEventListener("drop", drop);
  trashCan.addEventListener("click", resetGame);

  function dragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
  }

  function dragOver(event) {
      event.preventDefault();
  }

  function drop(event) {
      event.preventDefault();
      const eggId = event.dataTransfer.getData("text/plain");
      const egg = document.getElementById(eggId);
      egg.style.display = "none";
      tutorialText.textContent = "Great work! Click the can to take out the trash.";
      egg.draggable = false;
  }

  function resetGame() {
      if (tutorialText.textContent === "Great work! Click the can to take out the trash.") {
          trashCan.classList.add("hidden");
          egg.src = crackImages[0];
          egg.style.display = "block";
          crackStage = 0;
          tutorialText.textContent = "Now, without breaking anything this time, drag the egg to the pot below.";
          pot.classList.remove("hidden");
      }
  }
});
