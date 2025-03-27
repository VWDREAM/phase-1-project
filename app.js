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
                <td>${provider.name}</td>
                <td>${provider.service}</td>
                <td>${provider.location}</td>
                <td>
                    <button onclick="viewProfile(${provider.id})">View Profile</button>
                    <button onclick="booking(${provider.id})">Booking</button>
                    <button onclick="contacts(${provider.id})">Contacts</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.viewProfile = (id) => {
        fetch(`http://localhost:3000/serviceProviders/${id}`)
            .then(response => response.json())
            .then(provider => {
                document.getElementById('profileDetails').innerHTML = `
                    <p><strong>Name:</strong> ${provider.name}</p>
                    <p><strong>Service:</strong> ${provider.service}</p>
                    <p><strong>Location:</strong> ${provider.location}</p>
                    <p><strong>Rating:</strong> ${provider.rating}</p>
                    <p><strong>Description:</strong> ${provider.description}</p>
                `;
                document.getElementById('profileModal').style.display = 'block';
            });
    };

    window.booking = (id) => {
        document.getElementById('bookingProviderId').value = id;
        document.getElementById('bookingModal').style.display = 'block';
    };

    document.getElementById('bookingForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const bookingData = {
            providerId: parseInt(document.getElementById('bookingProviderId').value),
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            notes: document.getElementById('bookingNotes').value
        };

        console.log('Booking Data:', bookingData);

        document.getElementById('bookingMessage').style.display = 'block';

        setTimeout(() => {
            document.getElementById('bookingMessage').style.display = 'none';
            document.getElementById('bookingForm').reset();
            closeBookingModal();
        }, 3000);
    });

    window.contacts = (id) => {
        fetch(`http://localhost:3000/serviceProviders/${id}`)
            .then(response => response.json())
            .then(provider => {
                document.getElementById('contactDetails').innerHTML = `
                    <p><strong>Phone:</strong> <a href="tel:${provider.contact}">${provider.contact}</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@${provider.name.replace(/\s+/g, '').toLowerCase()}.com">info@${provider.name.replace(/\s+/g, '').toLowerCase()}.com</a></p>
                    <p><strong>Website:</strong> <a href="https://${provider.name.replace(/\s+/g, '').toLowerCase()}.com" target="_blank">${provider.name.replace(/\s+/g, '').toLowerCase()}.com</a></p>
                    <p><strong>Address:</strong> ${provider.address || 'Address not available'}</p>
                `;
                document.getElementById('contactsModal').style.display = 'block';
            });
    };

    window.closeProfileModal = () => {
        document.getElementById('profileModal').style.display = 'none';
    };

    window.closeBookingModal = () => {
        document.getElementById('bookingModal').style.display = 'none';
    };

    window.closeContactsModal = () => {
        document.getElementById('contactsModal').style.display = 'none';
    };

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        fetch('http://localhost:3000/serviceProviders')
            .then(response => response.json())
            .then(providers => {
                const filteredProviders = providers.filter(provider =>
                    provider.name.toLowerCase().includes(searchTerm) ||
                    provider.service.toLowerCase().includes(searchTerm) ||
                    provider.location.toLowerCase().includes(searchTerm)
                );
                renderProviders(filteredProviders);
            });
    });

    fetchProviders();
});