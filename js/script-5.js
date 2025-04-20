document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.querySelector('.news-container');
    const maxArticles = 5; // Limite le nombre d'articles à afficher

    // Fonction pour récupérer et afficher le flux RSS
    async function fetchRSS() {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const rssUrl = 'https://www.cert.ssi.gouv.fr/feed/'; // Remplacez par l'URL de votre flux RSS

        try {
            const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
            const data = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const items = xmlDoc.getElementsByTagName('item');

            newsContainer.innerHTML = ''; // Clear existing news items

            for (let i = 0; i < items.length && i < maxArticles; i++) {
                const item = items[i];
                const title = item.getElementsByTagName('title')[0].textContent;
                const link = item.getElementsByTagName('link')[0].textContent;
                const description = item.getElementsByTagName('description')[0].textContent;

                const newsItem = document.createElement('a');
                newsItem.href = link;
                newsItem.target = '_blank';
                newsItem.classList.add('news-link');
                newsItem.innerHTML = `
                    <div class="news-item">
                        <div class="news-content">
                            <h3>${title}</h3>
                            <p>${description}</p>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsItem);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du flux RSS:', error);
        }
    }

    fetchRSS();
});
