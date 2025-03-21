<script>
    // Fonction pour récupérer et afficher les données RSS
    function fetchRSS(url, elementId) {
        fetch(url)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                if (items.length > 0) {
                    const item = items[0]; // Prendre le premier article
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    const description = item.querySelector("description").textContent;

                    document.getElementById("news-title-" + elementId).textContent = title;
                    document.getElementById("news-title-" + elementId).href = link;
                    document.getElementById("news-description-" + elementId).textContent = description;
                }
            })
            .catch(error => console.error('Erreur lors de la récupération du flux RSS:', error));
    }

    // URLs des flux RSS (remplacez par des URLs de flux RSS réels)
    const rssFeeds = [
        "https://example.com/rss-feed-1.xml",
        "https://example.com/rss-feed-2.xml",
        "https://example.com/rss-feed-3.xml"
    ];

    // Charger les données RSS dans les conteneurs
    rssFeeds.forEach((url, index) => {
        fetchRSS(url, index + 1);
    });
</script>
