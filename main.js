const events = JSON.parse(localStorage.getItem('events')) || [];

function saveToStorage() {
    localStorage.setItem('events', JSON.stringify(events));
}

function addEvent() {
    const name = document.getElementById('eventName').value;
    const details = document.getElementById('eventDetails').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;

    if (!name || !details || !date || !time) {
        alert('Please fill in all fields.');
        return;
    }

    const event = { name, details, date, time, guests: [] };
    events.push(event);
    saveToStorage();
    renderEvents();
    document.getElementById('eventName').value = '';
    document.getElementById('eventDetails').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
}

function renderEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = '';

    events.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';

        eventDiv.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.details}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <input type="text" id="guestFullName-${index}" placeholder="Enter full name">
            <input type="email" id="guestEmail-${index}" placeholder="Enter email">
            <input type="tel" id="guestPhone-${index}" placeholder="Enter phone number">
            <select id="guestGender-${index}">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <button onclick="addGuest(${index})">Add Guest</button>
            <button onclick="sendReminder(${index})">Send Reminder</button>
        `;

        eventsContainer.appendChild(eventDiv);
    });
}

function addGuest(eventIndex) {
    const fullName = document.getElementById(`guestFullName-${eventIndex}`).value;
    const email = document.getElementById(`guestEmail-${eventIndex}`).value;
    const phone = document.getElementById(`guestPhone-${eventIndex}`).value;
    const gender = document.getElementById(`guestGender-${eventIndex}`).value;

    if (!fullName || !email || !phone || !gender) {
        alert('Please fill in all guest fields.');
        return;
    }

    const guest = { fullName, email, phone, gender };
    events[eventIndex].guests.push(guest);
    saveToStorage();
    renderGuests();
    document.getElementById(`guestFullName-${eventIndex}`).value = '';
    document.getElementById(`guestEmail-${eventIndex}`).value = '';
    document.getElementById(`guestPhone-${eventIndex}`).value = '';
    document.getElementById(`guestGender-${eventIndex}`).value = '';
}

function renderGuests() {
    const guestsContainer = document.getElementById('guestsContainer');
    guestsContainer.innerHTML = '';

    events.forEach((event, index) => {
        const guestList = document.createElement('div');
        guestList.className = 'guest';

        guestList.innerHTML = `
            <h4>${event.name} - Guests</h4>
            <ul>
                ${event.guests.map(guest => `
                    <li>
                        <strong>${guest.fullName}</strong> <br>
                        Email: ${guest.email} <br>
                        Phone: ${guest.phone} <br>
                        Gender: ${guest.gender}
                    </li>
                `).join('')}
            </ul>
        `;

        guestsContainer.appendChild(guestList);
    });
}

function sendReminder(eventIndex) {
    const event = events[eventIndex];
    alert(`Reminder sent for event: ${event.name}`);
}

function deleteAllData() {
    if (confirm('Are you sure you want to delete all data?')) {
        localStorage.clear();
        events.length = 0;
        renderEvents();
        renderGuests();
        alert('All data has been deleted.');
    }
}

renderEvents();
renderGuests();