let currentDonors = []

fetch('https://randomuser.me/api/?results=50')
  .then(response => response.json())
  .then(data => {
    const donors = data.results.map(donor => ({
      name: `${donor.name.first} ${donor.name.last}`,
      gender: donor.gender,
      city: donor.location.city,
      phone: donor.phone,
      amount: Math.floor(Math.random() * 100) + 1
    }))

    currentDonors = donors; // Sauvegarde les donateurs dans la variable globale
    displayDonors(donors);  // Affiche les donateurs sur la page
  })

const displayDonors = (donors) => {
  const container = document.getElementById('donor-list')
  container.innerHTML = '' // Vide le conteneur avant d'afficher les nouveaux donateurs

  donors.forEach(donor => {
    const div = document.createElement('div');
    div.className = 'donor-card'
    div.innerHTML = `
      <strong>${donor.name}</strong>
      <p>${donor.city}</p>
      <p>${donor.phone}</p>
      <p>${donor.amount} €</p>
    `
    container.appendChild(div)
  })
}

const filterByGender = (gender) => {
  const filtered = currentDonors.filter(d => d.gender === gender)
  displayDonors(filtered) // Affiche les donateurs filtrés selon le genre choisi
}

const sortByAmount = (ascending) => {
  const sorted = [...currentDonors].sort((a, b) => ascending ? a.amount - b.amount : b.amount - a.amount)
  displayDonors(sorted) // Affiche les donateurs triés par montant
}

const sortByName = () => {
  const sorted = [...currentDonors].sort((a, b) => a.name.split(' ')[0].localeCompare(b.name.split(' ')[0]))
  displayDonors(sorted) // Affiche les donateurs triés par prénom
}


