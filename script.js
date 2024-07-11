document.addEventListener("DOMContentLoaded", function () {
    const egg = document.getElementById("egg");
    const trashCan = document.getElementById("trash-can");
    const tutorialText = document.getElementById("tutorial-text");
    const pot = document.getElementById("pot");
    const firePot = document.getElementById("fire-pot");
    const fireExtinguisher = document.getElementById("fire-extinguisher");
    let endTriggered = false; // Flag to track if the ending has been triggered
    let ingredientsAdded = 0;
    let stage = 0;
    let crackStage = 0;
    let mushStage = 0;
    let slurpStage = 0;
    let crunchStage = 0;
    let ingredientIDs = [];
    let startTime;
    let endTime;
    const crunchShapes = ['images/crunch.png']
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
    egg.addEventListener("click", function () {
        if (stage === 0) {
            crackEgg();
        } else if (stage === 6) {
            mushEgg();
        }
    });

    startTime = new Date();
    

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
    function dropIngredient(event) {
        event.preventDefault();
        let ingredientID = event.dataTransfer.getData("text/plain");
    
        if (ingredientIDs.includes(ingredientID)) {
            if (ingredientID && (event.target.id === 'pot' || event.target.parentNode.id === 'pot')) {
                document.getElementById(ingredientID).classList.add('hidden'); // Hide only the dragged ingredient
                ingredientsAdded++;
                if (ingredientsAdded === totalIngredients) {
                    tutorialText.textContent = "Nice! Now stir everything together by shaking the pot.";
                    activatePotShaking();
                }
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
        tutorialText.textContent = "Well done! The egg has been braised.";
        tutorialText.textContent = "Now it's time to mush your egg into egg jam!";
        stage = 6;
        pot.removeAttribute('draggable');
        pot.removeEventListener('dragstart', potShakeStart);
        pot.removeEventListener('dragend', potShakeEnd);
        // Add event listeners to both the pot and the egg for mushing
        egg.addEventListener("click", mushEgg);
        pot.addEventListener("click", mushEgg);
    }

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
        jar.addEventListener('dragover', allowDrop);  // This is not needed for the jar but the pot.
        pot.addEventListener('dragover', allowDrop);
        pot.addEventListener('drop', handleJarDrop);
    }
    
    
    function allowDrop(event) {
        event.preventDefault();
    }
    
    function handleJarDrop(event) {
        event.preventDefault();
        if (event.dataTransfer.getData("text/plain") === 'jar') {
            jar.src = 'images/jam-jar.png';  // Ensure this path is correct
            jar.style.top = '40%';  // Adjust to place jar correctly over the pot
            egg.style.display = 'none';  // Hide the egg
            pot.style.display = 'none';  // Hide the pot
            tutorialText.textContent = "Your egg jam is done! There's only one thing left to do now...";
            jar.draggable = false;
            jar.classList.add('pointer')
            jar.removeEventListener('dragstart', dragStart);
            pot.removeEventListener('dragover', allowDrop);
            pot.removeEventListener('drop', handleJarDrop);
            jar.addEventListener('click', eatJam);
        }
    }
    
    function eatJam() {
        if (slurpStage === 0) {  // This checks if it's the first slurp
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
    
    function crunchJar() {
        if (crunchStage === 0) { 
            document.body.style.backgroundImage = "url('images/background3.png')";
        }
        if (crunchStage < crunchImages.length) {
            jar.src = crunchImages[crunchStage++];
            playSound('sounds/crunch.wav');
            if (crunchStage === crunchImages.length) {
                jar.removeEventListener('click', crunchJar);
                enableScreenEating(); // Enable screen eating only after the jar is fully eaten
                document.body.style.cursor = 'pointer'; // Set cursor to pointer
            }
        }
    }
    
    function enableScreenEating() {
        document.addEventListener('click', eatScreen);
    }
    
    function eatScreen(event) {
        if (crunchStage === 22) { // Only allow eating the screen if crunchStage is 22
            const crunchShape = crunchShapes[0]; // Use the crunch-png image
            const crunchDiv = document.createElement('div');
            const size = 600; // Size of each bite
    
            crunchDiv.style.position = 'absolute';
            crunchDiv.style.top = `${event.clientY - size / 2}px`;
            crunchDiv.style.left = `${event.clientX - size / 2}px`;
            crunchDiv.style.width = `${size}px`; 
            crunchDiv.style.height = `${size}px`; 
            crunchDiv.style.backgroundImage = `url(${crunchShape})`;
            crunchDiv.style.backgroundSize = 'cover';
            crunchDiv.style.transform = `rotate(${Math.random() * 360}deg)`; // Apply random rotation
            document.body.appendChild(crunchDiv);
            playSound('sounds/crunch.wav');
            checkIfScreenIsCovered(); // Call the function here to check coverage after each bite
        }
    }
    
    
    function checkIfScreenIsCovered() {
        const bodyRect = document.body.getBoundingClientRect();
        const crunchDivs = document.querySelectorAll('div[style*="background-image"]');
        const totalArea = bodyRect.width * bodyRect.height;
    
        // Create a 2D array to represent the grid
        const gridSize = 50; // Define the size of each grid cell
        const gridWidth = Math.ceil(bodyRect.width / gridSize);
        const gridHeight = Math.ceil(bodyRect.height / gridSize);
        const grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(false));
    
        // Mark the grid cells covered by each crunchDiv
        crunchDivs.forEach(crunchDiv => {
            const rect = crunchDiv.getBoundingClientRect();
    
            const startX = Math.floor((rect.left - bodyRect.left) / gridSize);
            const endX = Math.ceil((rect.right - bodyRect.left) / gridSize);
            const startY = Math.floor((rect.top - bodyRect.top) / gridSize);
            const endY = Math.ceil((rect.bottom - bodyRect.top) / gridSize);
    
            for (let y = startY; y < endY; y++) {
                for (let x = startX; x < endX; x++) {
                    if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
                        grid[y][x] = true;
                    }
                }
            }
        });
    
        // Calculate the covered area based on the grid cells
        let coveredArea = 0;
        grid.forEach(row => {
            row.forEach(cell => {
                if (cell) {
                    coveredArea += gridSize * gridSize;
                }
            });
        });
    
        if (coveredArea >= totalArea * 0.9) { // Check for 90% coverage
            // Stop the timer
            endTime = new Date();
            const elapsedTime = (endTime - startTime) / 1000; // Time in seconds
    
            // Format the time as MM:SS.ss
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            const formattedTime = `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
    
            tutorialText.textContent = `You made egg jam in ${formattedTime}`;
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