document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const items = document.querySelectorAll('.documentation-section p, .documentation-section h2, .documentation-card');

    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Effacer le contenu de la barre de recherche après la recherche
    document.getElementById('search-bar').value = '';
});

document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', function() {
        const category = button.getAttribute('data-category');
        const cards = document.querySelectorAll('.documentation-card');

        cards.forEach(card => {
            if (category === 'all' || card.classList.contains(`category-${category}`)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.querySelectorAll('.view-pdf').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        const pdfUrl = button.getAttribute('href');
        window.open(pdfUrl, '_blank'); // Ouvre le PDF dans un nouvel onglet
    });
});

document.querySelectorAll('.download-pdf').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        const pdfUrl = button.getAttribute('href');

        // Crée un élément <a> pour le téléchargement
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pdfUrl.split('/').pop(); // Nom du fichier à télécharger

        // Ajoute le lien au DOM et clique dessus pour déclencher le téléchargement
        document.body.appendChild(link);
        link.click();

        // Supprime le lien du DOM après le clic
        document.body.removeChild(link);
    });
});

