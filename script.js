let currentDonors = [];

fetch('https://randomuser.me/api/?results=50')
  .then(response => response.json())
  .then(data => {
    const donors = data.results.map(donor => ({
      name: `${donor.name.first} ${donor.name.last}`,
      gender: donor.gender,
      amount: Math.floor(Math.random() * 100) + 1
    }));

    currentDonors = donors; // Sauvegarde les donateurs dans la variable globale
    displayDonors(donors);  // Affiche les donateurs sur la page
  });

function displayDonors(donors) {
  const container = document.getElementById('donor-list');
  container.innerHTML = ''; // Vide le conteneur avant d'afficher les nouveaux donateurs

  donors.forEach(donor => {
    const div = document.createElement('div');
    div.className = 'donor-card';
    div.innerHTML = `
      <strong>${donor.name}</strong>
      <p>Genre : ${donor.gender}</p>
      <p>Montant : $${donor.amount}</p>
    `;
    container.appendChild(div);
  });
}

function filterByGender(gender) {
  const filtered = currentDonors.filter(d => d.gender === gender);
  displayDonors(filtered); // Affiche les donateurs filtrés
}

function sortByAmount(ascending) {
  const sorted = [...currentDonors].sort((a, b) => ascending ? a.amount - b.amount : b.amount - a.amount);
  displayDonors(sorted); // Affiche les donateurs triés par montant
}

function sortByName() {
  const sorted = [...currentDonors].sort((a, b) => a.name.split(' ')[0].localeCompare(b.name.split(' ')[0]));
  displayDonors(sorted); // Affiche les donateurs triés par prénom
}


