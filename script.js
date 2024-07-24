// Welcome to Braising Eggs, a 2D drag and drop game where you make egg jam (or as it's more commonly known, mayonnaise).
// This is my first game jam project. It was make for eggjam, a game jam with a theme of "raising eggs."
let startTime;
let endTimeRecorded = false; 
// The code pertaining to time was added because as I was play-testing, I found it really fun to go as fast as possible. This inspired me to add a speedrun timer.
document.addEventListener("DOMContentLoaded", function () {
    startTime = new Date();
    document.body.classList.add('fade-background');
    const egg = document.getElementById("egg");
    const trashCan = document.getElementById("trash-can");
    const tutorialText = document.getElementById("tutorial-text");
    const pot = document.getElementById("pot");
    const firePot = document.getElementById("fire-pot");
    const fireExtinguisher = document.getElementById("fire-extinguisher");
    // While working on this project I discovered that culinary games (or any simple 2D games involving repetitve processes) can be simplified greatly by adding stages like these in order to track progress.
    let ingredientsAdded = 0;
    let stage = 0;
    let crackStage = 0;
    let mushStage = 0;
    let slurpStage = 0;
    let crunchStage = 0;
    let ingredientIDs = [];
    const crunchShapes = ['images/crunch.png']
    const totalIngredients = 3;
    // Since braising an egg is a step-by-step process that involves a lot of individual changes, I made arrays using images I crafted in Canva to depict the egg's current state.
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
    const mushImages = [
        'images/egg-mush1.png',
        'images/egg-mush2.png',
        'images/egg-mush3.png',
        'images/egg-mush4.png',
        'images/egg-mush5.png',
        'images/egg-mush6.png'
    ];
    const slurpImages = [
        'images/egg-slurp1.png',
        'images/egg-slurp2.png',
        'images/egg-slurp3.png',
        'images/egg-slurp4.png',
        'images/egg-slurp5.png',
        'images/egg-slurp6.png',
        'images/egg-slurp7.png',
        'images/egg-slurp8.png',
        'images/egg-slurp9.png'
    ];
    const crunchImages = [
        'images/egg-crunch1.png',
        'images/egg-crunch2.png',
        'images/egg-crunch3.png',
        'images/egg-crunch4.png',
        'images/egg-crunch5.png',
        'images/egg-crunch6.png',
        'images/egg-crunch7.png',
        'images/egg-crunch8.png',
        'images/egg-crunch9.png',
        'images/egg-crunch10.png',
        'images/egg-crunch11.png',
        'images/egg-crunch12.png',
        'images/egg-crunch13.png',
        'images/egg-crunch14.png',
        'images/egg-crunch15.png',
        'images/egg-crunch16.png',
        'images/egg-crunch17.png',
        'images/egg-crunch18.png',
        'images/egg-crunch19.png',
        'images/egg-crunch20.png',
        'images/egg-crunch21.png',
        'images/egg-crunch22.png',
    ];

    // Initial egg image array progression
    egg.addEventListener("click", function () {
        if (stage === 0) {
            crackEgg();
        } else if (stage === 6) {
            mushEgg();
        }
    });

    // Default drag-and-drop events
    egg.addEventListener("dragstart", dragStart);
    trashCan.addEventListener("dragover", dragOver);
    trashCan.addEventListener("drop", dropInTrash);
    trashCan.addEventListener("click", showPot);
    pot.addEventListener("click", igniteFire);
    fireExtinguisher.addEventListener("dragstart", dragStart);
    firePot.addEventListener("dragover", dragOver);
    firePot.addEventListener("drop", extinguishFire);

    // Mobile drag-and-drop events (not currently functional)
    trashCan.addEventListener("touchmove", dragOver);
    trashCan.addEventListener("touchend", dropInTrash);
    trashCan.addEventListener("touchend", showPot); 
    pot.addEventListener("touchend", igniteFire); 
    fireExtinguisher.addEventListener("touchstart", dragStart);
    firePot.addEventListener("touchmove", dragOver);
    firePot.addEventListener("touchend", extinguishFire); 


    // Drag and drop
    function dragStart(event) {
        if (event.type === "touchstart") {
            event.dataTransfer = { setData: function(_, id) { this.id = id; } };
            event.dataTransfer.setData("text/plain", event.target.id);
            event.preventDefault();
        } else {
            event.dataTransfer.setData("text/plain", event.target.id);
        }
    }

    function dragOver(event) {
        event.preventDefault();
    }

    // Crack the egg
    function crackEgg() {
        if (crackStage < crackImages.length - 1) {
            egg.src = crackImages[++crackStage];
            playSound('sounds/crack.wav');
            if (crackStage === crackImages.length - 2) {
                tutorialText.textContent = "Whoops! It turns out you're not supposed to crack an egg to braise it properly.";
                egg.draggable = false;
            } else if (crackStage === crackImages.length - 1) {
                tutorialText.textContent = "Throw your broken egg in the trash.";
                egg.addEventListener("touchstart", dragStart);
                egg.draggable = true;
                trashCan.classList.remove("hidden");
            }
        }
    }

    // Throw the egg away
    function dropInTrash(event) {
        event.preventDefault();
        egg.style.display = "none";
        tutorialText.textContent = "Great work! Click the can to take out the trash.";
        egg.draggable = false;
        stage = 1;
        playSound('sounds/plop.wav');
    }

    // Show pot
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

    // Drop the egg in the pot
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

    // Boil the pot
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

    // Put out the fire
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

    // Display ingredients
    function showIngredients() {
        const ingredients = ['soy', 'soup', 'spice'];
        ingredientIDs = ingredients; 
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

    // Add ingredients
    function dropIngredient(event) {
        event.preventDefault();
        let ingredientID = event.dataTransfer.getData("text/plain");
        if (ingredientIDs.includes(ingredientID)) {
            if (ingredientID && (event.target.id === 'pot' || event.target.parentNode.id === 'pot')) {
                document.getElementById(ingredientID).classList.add('hidden'); 
                ingredientsAdded++;
                if (ingredientsAdded === totalIngredients) {
                    tutorialText.textContent = "Nice! Now stir everything together by shaking the pot.";
                    activatePotShaking();
                }
            }
        }
    }

    // Stir the pot
    function activatePotShaking() {
        pot.setAttribute('draggable', 'true');
        pot.addEventListener('dragstart', potShakeStart);
        pot.addEventListener('dragend', potShakeEnd);
    }

    function potShakeStart() {
        console.log("Pot shaking starts");
    }
    
    function potShakeEnd() {
        console.log("Pot shaking ends");
        tutorialText.textContent = "Well done! The egg has been braised.";
        tutorialText.textContent = "Now it's time to mush your egg into egg jam!";
        stage = 6;
        pot.removeAttribute('draggable');
        pot.removeEventListener('dragstart', potShakeStart);
        pot.removeEventListener('dragend', potShakeEnd);
        egg.addEventListener("click", mushEgg);
        pot.addEventListener("click", mushEgg);
    }

    // Mush the egg
    function mushEgg() {
        if (stage === 6 && mushStage < mushImages.length) {
            egg.src = mushImages[mushStage++];
            playSound('sounds/mush.wav');
            if (mushStage === mushImages.length) {
                tutorialText.textContent = "Your egg jam is ready! Let's put it in a nice jar.";
                egg.removeEventListener("click", mushEgg);  
                pot.removeEventListener("click", mushEgg);  
                displayJar();
            }
        }
    }

    // Display jar
    function displayJar() {
        jar = document.createElement('img');
        jar.src = 'images/jar.png';  
        jar.id = 'jar';
        jar.classList.add('pointer')
        jar.style.position = 'absolute';
        jar.style.top = '10%';  
        jar.style.left = '50%';
        jar.style.transform = 'translateX(-50%)';
        jar.draggable = true;
        document.body.appendChild(jar); 
        jar.addEventListener('dragstart', dragStart);
        jar.addEventListener('dragover', allowDrop); 
        pot.addEventListener('dragover', allowDrop);
        pot.addEventListener('drop', handleJarDrop);
    }
    
    function allowDrop(event) {
        event.preventDefault();
    }
    
    // Add egg jam to jar
    function handleJarDrop(event) {
        event.preventDefault();
        if (event.dataTransfer.getData("text/plain") === 'jar') {
            jar.src = 'images/jam-jar.png';  
            jar.style.top = '40%';  
            egg.style.display = 'none';  
            pot.style.display = 'none';  
            tutorialText.textContent = "Your egg jam is done! There's only one thing left to do now...";
            jar.draggable = false;
            jar.classList.add('pointer')
            jar.removeEventListener('dragstart', dragStart);
            pot.removeEventListener('dragover', allowDrop);
            pot.removeEventListener('drop', handleJarDrop);
            jar.addEventListener('click', eatJam);
        }
    }
    
    // Eat egg jam
    function eatJam() {
        if (slurpStage === 0) {  
            document.body.style.backgroundImage = "url('images/background2.png')";
        }
        
        if (slurpStage < slurpImages.length) {
            jar.src = slurpImages[slurpStage++];
            playSound('sounds/slurp.wav');
            if (slurpStage === slurpImages.length) {
                jar.removeEventListener("click", eatJam);
                jar.addEventListener("click", crunchJar);
            }
        }
    }
    
    // Eat jar
    function crunchJar() {
        if (crunchStage === 0) { 
            document.body.style.backgroundImage = "url('images/background3.png')";
        }
        if (crunchStage < crunchImages.length) {
            jar.src = crunchImages[crunchStage++];
            playSound('sounds/crunch.wav');
            if (crunchStage === crunchImages.length) {
                jar.removeEventListener('click', crunchJar);
                setTimeout(enableScreenEating, 100);
                document.body.style.cursor = 'pointer'; 
            }
        }
    }
    
    // Eat screen
    function enableScreenEating() {
        document.addEventListener('click', eatScreen);
    }
    
    function eatScreen(event) {
        const crunchShape = crunchShapes[0];
        const crunchDiv = document.createElement('div');
        const size = 600;
        crunchDiv.style.position = 'absolute';
        crunchDiv.style.top = `${event.clientY - size / 2}px`;
        crunchDiv.style.left = `${event.clientX - size / 2}px`;
        crunchDiv.style.width = `${size}px`;
        crunchDiv.style.height = `${size}px`;
        crunchDiv.style.backgroundImage = `url(${crunchShape})`;
        crunchDiv.style.backgroundSize = 'cover';
        crunchDiv.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(crunchDiv);
        playSound('sounds/crunch.wav');
    
        if (!endTimeRecorded) {
            endTimeRecorded = true;
            endTime = new Date();
            let timeTaken = new Date(endTime - startTime);
            let minutes = timeTaken.getUTCMinutes();
            let seconds = timeTaken.getUTCSeconds();
            let milliseconds = timeTaken.getUTCMilliseconds();
            tutorialText.textContent = `You made egg jam in ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        }
    }    
    
    function playSound(soundFile) {
        const sound = new Audio(soundFile);
        sound.play();
    }
    
    // Disable scrollbars
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
})    