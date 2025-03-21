document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("dynamic-text");

    const texts = ["Enzo TALLET", "BTS SIO", "Option SISR"];
    let currentIndex = 0;
    let currentText = "";
    let typingSpeed = 100;
    let deleteSpeed = 50;
    let pauseTime = 1000;

    function typeText() {
        currentText = texts[currentIndex];
        let i = 0;
        textElement.innerHTML = "";

        function typing() {
            if (i < currentText.length) {
                textElement.innerHTML = currentText.substring(0, i + 1);
                i++;
                setTimeout(typing, typingSpeed);
            } else {
                setTimeout(deleteText, pauseTime);
            }
        }

        function deleteText() {
            let i = currentText.length;
            function deleting() {
                if (i > 0) {
                    textElement.innerHTML = currentText.substring(0, i - 1);
                    i--;
                    setTimeout(deleting, deleteSpeed);
                } else {
                    currentIndex = (currentIndex + 1) % texts.length;
                    typeText();
                }
            }
            deleting();
        }

        typing();
    }

    typeText();

    function showOption(option) {
        document.getElementById('SLAM').classList.add('hidden');
        document.getElementById('SISR').classList.add('hidden');
        document.getElementById(option).classList.remove('hidden');
    }

    function displayProject(projectName) {
        document.getElementById('project-display').classList.remove('hidden');
        document.getElementById('project-title').innerText = projectName;
        document.getElementById('project-description').innerText = "Détails de " + projectName;
    }

    // ✅ Masquer les textes dès le chargement de la page
    document.querySelectorAll(".bts-sio-text-content").forEach(element => {
        element.classList.add("hidden");
    });

    // ✅ Ajout de l'affichage et du masquage du texte des boutons
    document.querySelectorAll(".bts-sio-btn").forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.classList.toggle("hidden");
            }
        });
    });

    function animateProgress(circle, targetValue) {
        let currentValue = 0;
        let maxOffset = 314; // Circonférence totale du cercle
        let targetOffset = maxOffset - (maxOffset * targetValue) / 100;
        let step = 2; // Vitesse de l'animation (plus grand = plus rapide)

        function updateProgress() {
            if (currentValue < targetValue) {
                currentValue += step;
                if (currentValue > targetValue) currentValue = targetValue;

                let currentOffset = maxOffset - (maxOffset * currentValue) / 100;
                circle.style.strokeDashoffset = currentOffset;

                requestAnimationFrame(updateProgress);
            }
        }
        updateProgress();
    }

    const buttons = document.querySelectorAll('.category-button');
    const contents = document.querySelectorAll('.category');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            contents.forEach(content => {
                content.classList.remove('active');
                content.querySelectorAll('.progress').forEach(progress => {
                    progress.style.strokeDashoffset = 314; // Réinitialiser l'animation
                });
            });

            const categoryId = button.getAttribute('data-category');
            const selectedContent = document.getElementById(categoryId);
            selectedContent.classList.add('active');

            // Initialiser l'animation pour la catégorie sélectionnée
            selectedContent.querySelectorAll('.progress').forEach(progress => {
                const value = progress.getAttribute('data-value');
                animateProgress(progress, value);
            });
        });
    });

    // Afficher la première catégorie par défaut
    contents[0].classList.add('active');
    contents[0].querySelectorAll('.progress').forEach(progress => {
        const value = progress.getAttribute('data-value');
        animateProgress(progress, value);
    });
});
    