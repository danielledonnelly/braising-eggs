// script.js
document.addEventListener("DOMContentLoaded", function () {
  const egg = document.getElementById("egg");
  const trashCan = document.getElementById("trash-can");
  const tutorialText = document.getElementById("tutorial-text");
  
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
          tutorialText.textContent = "Now, throw your broken egg in the trash.";
          egg.draggable = true;
          trashCan.classList.remove("hidden");
      }
  });

  egg.addEventListener("dragstart", dragStart);
  trashCan.addEventListener("dragover", dragOver);
  trashCan.addEventListener("drop", drop);

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
      tutorialText.textContent = "Great! Now let's proceed to braising the egg properly.";
      // Proceed to the next step (e.g., showing the braising step)
      // nextStep();
  }
});
