document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-button');
    const statusCheckboxes = document.querySelectorAll('.status-options input');
    const breathingSelect = document.querySelector('.breathing-options select');
    const clearFiltersButton = document.querySelector('.limpar-filtros');
    const characterCards = document.querySelectorAll('.character-card');

    function filterCharacters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedStatus = Array.from(statusCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const selectedBreathing = breathingSelect.value.toLowerCase();

        characterCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const statusBadge = card.querySelector('.status-badge');
            const status = statusBadge.classList.contains('dead') ? 'morto' : 'vivo';
            const breathing = card.querySelector('.breathing-style').textContent.toLowerCase();

            const matchesSearch = name.includes(searchTerm);
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(status);
            const matchesBreathing = !selectedBreathing || breathing === selectedBreathing;

            if (matchesSearch && matchesStatus && matchesBreathing) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Event Listeners
    searchInput.addEventListener('input', filterCharacters);
    searchButton.addEventListener('click', filterCharacters);
    statusCheckboxes.forEach(cb => cb.addEventListener('change', filterCharacters));
    breathingSelect.addEventListener('change', filterCharacters);

    clearFiltersButton.addEventListener('click', function(e) {
        e.preventDefault();
        searchInput.value = '';
        statusCheckboxes.forEach(cb => cb.checked = false);
        breathingSelect.value = '';
        characterCards.forEach(card => card.classList.remove('hidden'));
    });
});
