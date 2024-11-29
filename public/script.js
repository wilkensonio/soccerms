document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value;
    fetch(`http://localhost:3000/api/players?name=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            const playerList = document.getElementById('player-list');
            playerList.innerHTML = '';
            data.forEach(player => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = player.name;
                playerList.appendChild(li);
            });
        })
        .catch(err => console.error(err));
});
//  Index.html Scriptsκ
document.getElementById('logout-nav').addEventListener('click', function() {
    window.location.href = '/pages/logout.html';
    
});

 
const delPlayer = (id) => { 
    fetch(`/api/players/${id}`, {
        method: 'DELETE'
    })
    .then(response =>  { 
        if (response.status === 200) {
            fetchPlayers();
        } else {
            alert('Error deleting player'); 
    }
    })
    .catch(err => console.error(err));
};  
 

 // Fetch number of fans for a player
function fetchNumberOfFans(playerId) {
    return new Promise((resolve, reject) => {
        $.get(`/api/fans/numberOfFans/${playerId}`, function (data) {
            resolve(data.numberOfFans);
        }).fail((error) => {
            console.error('Error fetching number of fans:', error);
            resolve(0); // Default to 0 if there's an error
        });
    });
}

async function fetchPlayers(searchTerm = '') {
    try {
        const response = await $.get(`/api/players?name=${searchTerm}`);
        const playerTableBody = $('#player-table-body');
        playerTableBody.empty();

        // Populate player select dropdown for transfer
        const selectPlayer = $('#playerSelect');
        selectPlayer.empty();

        selectPlayer.append(`
            <option value="" disabled selected>Select a player</option>
        `);

        if (response.length > 0) {
            for (const player of response) {
                // Fetch the number of fans for the current player
                const numberOfFans = await fetchNumberOfFans(player.player_id);

                // Populate player select dropdown for transfer
                selectPlayer.append(`
                    <option value="${player.player_id}">${player.name}</option>
                `);

                playerTableBody.append(`
                    <tr>
                        <td>${player.name}</td>
                        <td class="text-end">${player.age}</td>
                        <td class="d-none d-xl-table-cell text-end">${player.nationality}</td>
                        <td class="d-none d-xl-table-cell text-end">${player.position}</td>
                        <td class="d-none d-xl-table-cell text-end">${player.goals}</td>
                        <td class="d-none d-xl-table-cell text-end">${player.assists || 0}</td>
                        <td class="d-none d-xl-table-cell text-end">${player.minutes_played || 0}</td>
                        <td class="d-none d-xl-table-cell text-end">${player.injuries || 'No injury'}</td>
                        <td class="d-none d-xl-table-cell text-end">${numberOfFans}</td>
                        <td class="d-none d-xl-table-cell text-end"><button class='player-del btn btn-danger' data-id="${player.player_id}">Delete</button></td>
                        <td class="d-none d-xl-table-cell text-end"><button class='player-update btn btn-primary' data-id="${player.player_id}">Update</button></td>
                    </tr>
                `);
            }
        } else {
            playerTableBody.append('<tr><td colspan="9" class="text-center">No players found.</td></tr>');
        }
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}


const getPlayerById = async (id) => {
    try {
        const response = await fetch(`/api/players/${id}`);
        const player = await response.json();
        return player;
    } catch (error) {
        console.log(error);
        
    } 
}

const getClubById = async (id) => {
    try {
        const response = await fetch(`/api/clubs/${id}`);
        const club = await response.json(); 
        return club;
    } catch (error) {
        console.log(error);
    }
}

//  show player current club when setected for transfer 
document.getElementById('playerSelect').addEventListener('change', async function() {
    const selectedPlayerId = this.value; 
    let currentClub = '';
    let currentClubId = '';

    // get the current player's club    
    const playerObj = await getPlayerById(selectedPlayerId);
    const clubId = playerObj.club_id;
    const club = await getClubById(clubId);
    currentClub = club.name; 
    currentClubId = club.club_id;  
   
    if (currentClub) { 
        document.getElementById('fromClubId').value = currentClubId;
        document.getElementById('fromClub').value = currentClub;
    }
});


// Delete player 
document.addEventListener('click', function(event) { 
    if (event.target && event.target.classList.contains('player-del')) {
        const id = event.target.getAttribute('data-id'); 
        delPlayer(id);
        fetchPlayers();
    }
});
 
// update player
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('player-update')) {
        const id = event.target.getAttribute('data-id'); 
     
        fetch(`/api/players/${id}`)
            .then(response => response.json())
            .then(player => {
                // Populate modal fields with player data
                document.getElementById('update-player-id').value = player.player_id;
                document.getElementById('update-player-name').value = player.name;
                document.getElementById('update-player-age').value = player.age;
                document.getElementById('update-player-nationality').value = player.nationality;
                document.getElementById('update-player-position').value = player.position;
                document.getElementById('update-player-goals').value = player.goals || 0;
                document.getElementById('update-player-assists').value = player.assists || 0;
                document.getElementById('update-player-minutes-palyed').value = player.minutes_played || 0;
                document.getElementById('update-player-injury').value = player.injuries || 'no injury';
                document.getElementById('update-player-club_id').value = player.club_id; 
                 
                $('#update-player-modal').modal('show');
            })
            .catch(err => console.error(err));
    }
});


document.getElementById('save-player-updates').addEventListener('click', function() {
    const id = document.getElementById('update-player-id').value;
    const updatedPlayer = {
        name: document.getElementById('update-player-name').value,
        age: document.getElementById('update-player-age').value,
        nationality: document.getElementById('update-player-nationality').value,
        position: document.getElementById('update-player-position').value,
        goals: document.getElementById('update-player-goals').value,
        assists: document.getElementById('update-player-assists').value,
        minutes_played: document.getElementById('update-player-minutes-palyed').value,
        injuries: document.getElementById('update-player-injury').value, 
        club_id: document.getElementById('update-player-club_id').value,
    };

    fetch(`/api/players/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlayer),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Player updated successfully');
                $('#update-player-modal').modal('hide');
                fetchPlayers(); // Refresh player list
            } else {
                alert('Failed to update player');
            }
        })
        .catch(err => console.error(err));
});


// add player 
document.addEventListener("DOMContentLoaded", function() {
    const addPlayerForm = document.getElementById("add-player-form");
    const savePlayerButton = document.getElementById("save-player"); 
  
    const addPlayerModal = document.getElementById("add-player-modal");
    addPlayerModal.addEventListener('show.bs.modal', function() {
        addPlayerForm.reset();
    });

     
    savePlayerButton.addEventListener("click", function() { 
        const name = document.getElementById("add-player-name").value;
        const age = document.getElementById("add-player-age").value;
        const nationality = document.getElementById("add-player-nationality").value;
        const position = document.getElementById("add-player-position").value;
        const club_id = document.getElementById("add-player-club_id").value;

        if (name === '' || age === '' 
            || nationality === '' || position === '') {
            alert('Please fill in all fields');
            return;
        } 

        if (club_id === '') {
            alert('Please select a club');
            return;
        }
                
        const goals = parseInt(document.getElementById("add-player-goals").value) || 0;
        const assists = parseInt(document.getElementById("add-player-assists").value) || 0;
        const minutes_played = parseInt(document.getElementById("add-player-minutes-played").value) || 0;
        const injuries = document.getElementById("add-player-injury").value || 'no injury'; 
        
        // Player object
        const newPlayer = {
            name,
            age,
            nationality,
            position,
            goals,
            assists,
            minutes_played,
            injuries,
            club_id
        };  
       
        fetch('/api/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlayer)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Player added successfully:', data); 
            alert('Player added successfully, Woohoo! add another one ⚽️⚽️');
            fetchPlayers(); // Refresh player list
            addPlayerForm.reset();
        })
        .catch(error => {
            console.error('Error adding player:', error);
        });
    });
}); 


$('#search-button').on('click', function() {
    const searchTerm = $('#search').val();
    fetchPlayers(searchTerm);
});

//  load clubs
function fetchClubs() {
    fetch('/api/clubs')
        .then(response => response.json())
        .then(data => {
            const clubSelect = document.getElementById('add-player-club_id');
            // transfer player select dropdown 
            const toClubSelect = document.getElementById('toClubSelect');

            clubSelect.innerHTML = '';
            // transfer player select dropdown 
            toClubSelect.innerHTML = '';

            data.forEach(club => {
                // transfer club select dropdown
                const fromOption = document.createElement('option');
                const toOption = document.createElement('option');
                fromOption.value = club.club_id;
                toOption.value = club.club_id;
                fromOption.textContent = club.name;
                toOption.textContent = club.name;  
                toClubSelect.appendChild(toOption);
                // display all clubs
                const option = document.createElement('option');
                option.value = club.club_id;
                option.textContent = club.name;
                clubSelect.appendChild(option);
            });
        })
        .catch(err => console.error(err));
}

// transfer player and history  
function fetchTransferHistory() {
    fetch('/api/transfers/history')
        .then(response => response.json())
        .then(data => { 
            
            const transferTableBody = document.getElementById('history-table');
            transferTableBody.innerHTML = '';   

            if (data.transfers && data.transfers.length > 0) {
                data.transfers.forEach(transfer => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transfer.player_name}</td>
                        <td class="text-end">${transfer.from_club}</td>
                        <td class="d-none d-xl-table-cell text-end">${transfer.to_club}</td>
                        <td class="col-2">${transfer.transfer_date}</td>
                        <td class="d-none d-xl-table-cell text-end">${transfer.transfer_fee}</td>
                    `;
                    transferTableBody.appendChild(row);
                });
            } else {
                const noTransferRow = document.createElement('tr');
                noTransferRow.innerHTML = `<td colspan="5" class="text-center">No transfers found.</td>`;
                transferTableBody.appendChild(noTransferRow);
            }
        })
        .catch(error => {
            console.error('Error fetching transfer history:', error);
        });
} 


// Update the player table with the new club
function updatePlayerTable(playerId, newClubId) {
    const playerRow = document.querySelector(`#player-table-body tr[data-player-id="${playerId}"]`);
    if (playerRow) {
        const clubCell = playerRow.querySelector('.player-club');
        clubCell.textContent = `Club ${newClubId}`;
    }
}

// Function to update the transfer table with the new transfer details
function updateTransferTable(playerId, clubId, transferFee, transferDate) {
    const transferTableBody = document.querySelector('#history-table');
    const newTransferRow = document.createElement('tr');

    newTransferRow.innerHTML = `
        <td>${playerId}</td>
        <td>${clubId}</td>
        <td>${transferFee}</td>
        <td>${transferDate}</td>
    `;

    transferTableBody.appendChild(newTransferRow);
}

// Update the player's club and add a new transfer record
const transferPlayer = async (transferData) => {
    try {
        const response = await fetch('/api/transfers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transferData),
        });

        // Check if the response status is OK
        if (!response.ok) {
            const errorText = await response.text(); // Get the raw text response for debugging
            console.log(response, 'respon'  );
            
            console.error('Error Response:', errorText); // Log the error for clarity
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Transfer Response:', data);
        if (data.success) {
            updatePlayerTable(transferData.player_id, transferData.to_club_id);
            updateTransferTable(
                transferData.player_id, 
                transferData.from_club_id, 
                transferData.to_club_id, 
                transferData.transfer_fee, 
                transferData.transfer_date
            ); 
            fetchPlayers();
            fetchClubs();
            fetchTransferHistory();
            alert('Player transferred successfully!');

        } else {
            alert('Transfer failed: ' + data.message);
        }
    } catch (error) {
        console.log('Error:', error);   
        console.error('Error:', error);
        alert('An error occurred while processing the transfer.');
    }
};


document.getElementById('transferForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const playerId = document.getElementById('playerSelect').value;
    const fromClub = document.getElementById('fromClubId').value;
    const toClubId = document.getElementById('toClubSelect').value;
    const transferFee = document.getElementById('transferFee').value;
    const transferDate = document.getElementById('transferDate').value;

    const transferData = {
        club_id: fromClub,
        player_id: playerId,
        from_club_id: fromClub,
        to_club_id: toClubId,
        transfer_fee: transferFee,
        transfer_date: transferDate
    };

    console.log('Transfer Data:', transferData); 
    await transferPlayer(transferData);
});

// fans 



// Initial fetch
$(document).ready(function() {
    fetchPlayers();
    fetchClubs();
    fetchTransferHistory();
});


