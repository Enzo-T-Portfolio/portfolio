document.addEventListener("DOMContentLoaded", function () {
    function animateProgress(circle, targetValue) {
        let currentValue = 0;
        const maxOffset = 314; // Circonférence totale du cercle
        const targetOffset = maxOffset - (maxOffset * targetValue) / 100;
        const step = 2; // Vitesse de l'animation (plus grand = plus rapide)

        function updateProgress() {
            if (currentValue < targetValue) {
                currentValue += step;
                if (currentValue > targetValue) currentValue = targetValue;

                const currentOffset = maxOffset - (maxOffset * currentValue) / 100;
                circle.style.strokeDashoffset = currentOffset;

                requestAnimationFrame(updateProgress);
            }
        }
        updateProgress();
    }

    // Animer tous les cercles de progression lors du chargement de la page
    const progressCircles = document.querySelectorAll('.progress');
    progressCircles.forEach(progress => {
        const value = progress.getAttribute('data-value');
        animateProgress(progress, value);
    });
});
