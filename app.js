document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#serviceTable tbody');
    const searchInput = document.getElementById('searchInput');

    function fetchProviders() {
        fetch('http://localhost:3000/serviceProviders')
            .then(response => response.json())
            .then(providers => {
                renderProviders(providers);
            });
    }

    function renderProviders(providers) {
        tableBody.innerHTML = '';
        providers.forEach(provider => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${provider.id}</td>
                <td>${provider.company}</td>
                <td>${provider.specialization}</td>
                <td>${provider.location}</td>
                <td>${provider.availability}</td>

                <td>
                    <button onclick="editProvider(${provider.id})">Edit</button>
                    <button onclick="deleteProvider(${provider.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetchProviders();
})