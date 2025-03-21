document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".category-button-projet");
    const projectCards = document.querySelectorAll(".project-card-projet");
    const modal = document.getElementById("projectModal");
    const closeButton = document.querySelector(".close-button");

    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = button.getAttribute("data-category");
            projectCards.forEach(card => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    projectCards.forEach(card => {
        card.addEventListener("click", function () {
            openModal(card);
        });
    });
});

function openModal(projectCard) {
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    // Récupérer les données de la carte de projet
    const title = projectCard.getAttribute('data-title');
    const description = projectCard.getAttribute('data-description');

    // Mettre à jour le contenu du modal
    modalTitle.textContent = title;
    modalDescription.innerHTML = description; // Utilisez innerHTML pour insérer du contenu HTML

    // Afficher le modal
    modal.style.display = 'block';
}
