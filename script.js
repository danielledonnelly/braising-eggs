document.addEventListener("DOMContentLoaded", function () {
    const egg = document.getElementById("egg");
    const trashCan = document.getElementById("trash-can");
    const tutorialText = document.getElementById("tutorial-text");
    const pot = document.getElementById("pot");
    const firePot = document.getElementById("fire-pot");
    const fireExtinguisher = document.getElementById("fire-extinguisher");
    let ingredientsAdded = 0;
    let crackStage = 0;
    let stage = 0;
    const totalIngredients = 3;
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
        if (stage === 0) {
            crackEgg();
        }
    });

    egg.addEventListener("dragstart", dragStart);
    trashCan.addEventListener("dragover", dragOver);
    trashCan.addEventListener("drop", dropInTrash);
    trashCan.addEventListener("click", showPot);
    pot.addEventListener("click", igniteFire);
    fireExtinguisher.addEventListener("dragstart", dragStart);
    firePot.addEventListener("dragover", dragOver);
    firePot.addEventListener("drop", extinguishFire);

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
        playSound('sounds/plop.wav');
    }

    function showPot() {
        if (tutorialText.textContent === "Great work! Click the can to take out the trash.") {
            playSound('sounds/trash.wav');
            trashCan.classList.add("hidden");
            egg.src = crackImages[0];
            egg.style.display = "block";
            crackStage = 0;
            tutorialText.textContent = "Now, without breaking anything this time, drag the egg to the pot below.";
            pot.classList.remove("hidden");
            egg.draggable = true;
            pot.addEventListener("dragover", dragOver);
            pot.addEventListener("drop", dropInPot);
            stage = 2;
        }
    }

    function dropInPot(event) {
        event.preventDefault();
        if (stage === 2) {
            egg.style.zIndex = "0";
            egg.style.position = "relative";
            egg.style.top = "100%";
            egg.style.left = "50%";
            egg.style.transform = "translate(-50%, 55%)";
            egg.draggable = false;
            stage = 3;
            playSound('sounds/plop.wav');
            tutorialText.textContent = "Well done! Now click the pot to start boiling it.";
        }
    }

    function igniteFire() {
        if (stage === 3) {
            playSound('sounds/fire.wav');
            pot.removeEventListener("click", igniteFire);
            pot.classList.add("hidden");
            firePot.classList.remove("hidden");
            tutorialText.textContent = "Uh oh, that's not good! Put out the fire!";
            fireExtinguisher.classList.remove("hidden");
            stage = 4;
        }
    }

    function extinguishFire(event) {
        event.preventDefault();
        if (stage === 4) {
            playSound('sounds/extinguish.wav');
            fireExtinguisher.style.display = "none";
            firePot.classList.add("hidden");
            pot.classList.remove("hidden");
            tutorialText.textContent = "The fire is out. Let's make the broth.";
            stage = 5;
            showIngredients();
        }
    }

    function crackEgg() {
        if (crackStage < crackImages.length - 1) {
            egg.src = crackImages[++crackStage];
            playSound('sounds/crack.wav');
            if (crackStage === crackImages.length - 2) {
                tutorialText.textContent = "Whoops! It turns out you're not supposed to crack an egg to braise it properly.";
                egg.draggable = false;
            } else if (crackStage === crackImages.length - 1) {
                tutorialText.textContent = "Throw your broken egg in the trash.";
                egg.draggable = true;
                trashCan.classList.remove("hidden");
            }
        }
    }

    function showIngredients() {
        const ingredients = ['soy', 'soup', 'spice'];
        ingredients.forEach((ingredient, index) => {
            const element = document.createElement('img');
            element.src = `images/${ingredient}.png`;
            element.id = ingredient;
            element.classList.add('ingredient');
            element.style.position = 'absolute';
            element.style.top = '74%'; 
            element.style.left = `${47.5 + (index - 1) * 5}%`; 
            element.draggable = true;
            element.addEventListener('dragstart', dragStart);
            document.getElementById('step-container').appendChild(element);
        });

        pot.addEventListener('dragover', dragOver);
        pot.addEventListener('drop', dropIngredient);
    }

    function dropIngredient(event) {
        event.preventDefault();
        let ingredient = event.dataTransfer.getData("text/plain");
        if (ingredient && (event.target.id === 'pot' || event.target.parentNode.id === 'pot')) {
            document.getElementById(ingredient).classList.add('hidden'); // Hide only the dragged ingredient
            ingredientsAdded++;
            if (ingredientsAdded === totalIngredients) {
                tutorialText.textContent = "Nice! Now stir everything together by shaking the pot.";
                activatePotShaking();
            }
        }
    }

    function activatePotShaking() {
        pot.setAttribute('draggable', 'true');
        pot.addEventListener('dragstart', potShakeStart);
        pot.addEventListener('dragend', potShakeEnd);
    }

    function potShakeStart(event) {
        console.log("Pot shaking starts");
    }

    function potShakeEnd(event) {
        console.log("Pot shaking ends");
        tutorialText.textContent = "Well done! The ingredients are mixed.";
        stage = 6;  // Advance to next stage
        pot.removeAttribute('draggable');
        pot.removeEventListener('dragstart', potShakeStart);
        pot.removeEventListener('dragend', potShakeEnd);
    }

    function playSound(soundFile) {
        const sound = new Audio(soundFile);
        sound.play();
    }
});
