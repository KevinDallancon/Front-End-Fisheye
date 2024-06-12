const modal = document.getElementById('contact_modal')
const form = document.querySelector('form[name="reserve"]')
const balisePrenom = document.getElementById('prenom')
const baliseNom = document.getElementById('nom')
const baliseMail = document.getElementById('email')
const baliseMessage = document.getElementById('precisions')

function displayModal () {
  modal.style.display = 'block'
  const nameForm = document.querySelector('.name')
  nameForm.textContent = name
}

function closeModal () {
  modal.style.display = 'none'
}

// Fonction pour valider les prénoms et les noms avec une expression régulière
function verifierPrenomNom (balise) {
  // Définition du RegExp
  const nameRegExp = new RegExp('^[A-Za-z-]{2,30}$')
  // Test du RegExp
  const testName = nameRegExp.test(balise.value)
  // Résultat conditionnel
  if (testName) {
    balise.nextElementSibling.innerText = 'Champ valide.'
    balise.nextElementSibling.style.color = 'green'
    return true
  } else {
    balise.nextElementSibling.innerText = 'Veuillez entrer 2 caractères ou plus dans ce champ.'
    balise.nextElementSibling.style.color = 'red'
    return false
  };
}

// Fonction pour valider les adresses e-mail
function verifierEmail (balise) {
  // Définition du regexMail
  const regexMail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
  // Test du regexMail
  const testMail = regexMail.test(balise.value)

  if (testMail) {
    balise.nextElementSibling.innerText = 'Champ valide.'
    balise.nextElementSibling.style.color = 'green'
    return true
  } else {
    balise.nextElementSibling.innerText = 'Champ vide ou adresse mail incorrect.'
    balise.nextElementSibling.style.color = 'red'
    return false
  }
}

function verifierMessage (balise) {
  const message = balise.value

  if (message.length < 10) {
    balise.nextElementSibling.innerText = 'Le message doit contenir au moins 10 caractères.'
    balise.nextElementSibling.style.color = 'red'
    console.log('Message n\'est pas valide')
    return false
  } else {
    balise.nextElementSibling.innerText = 'Champ valide.'
    balise.nextElementSibling.style.color = 'green'
    console.log('Message est valide')
    return true
  }
}

function ctrlForm () {
  const isPrenomValid = verifierPrenomNom(balisePrenom)
  const isNomValid = verifierPrenomNom(baliseNom)
  const isEmailValid = verifierEmail(baliseMail)
  const isMessageValid = verifierMessage(baliseMessage)

  const isValid = isPrenomValid && isNomValid && isEmailValid && isMessageValid

  if (isValid) {
    modal.style.display = 'none'
  }
}

// Attacher les écouteurs d'événements pour la validation en temps réel
balisePrenom.addEventListener('change', () => verifierPrenomNom(balisePrenom))
baliseNom.addEventListener('change', () => verifierPrenomNom(baliseNom))
baliseMail.addEventListener('change', () => verifierEmail(baliseMail))
baliseMessage.addEventListener('change', () => verifierMessage(baliseMessage))

// Écouteur pour la soumission du formulaire
form.addEventListener('submit', (event) => {
  event.preventDefault()
  ctrlForm()
  console.log(balisePrenom.value)
  console.log(baliseNom.value)
  console.log(baliseMail.value)
  console.log(baliseMessage.value)
  form.reset()
})
