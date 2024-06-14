import { photographerTemplate } from '../templates/photographer.js'
import { mediaTemplate } from '../templates/media.js'

// 1) Récupérer l'ID du photographe à partir de l'URL
const url = new URLSearchParams(window.location.search)
const id = url.get('id')
console.log('ID du photographe :', id)

// 2) Fonction pour chercher le photographe concerné depuis la liste des photographes
async function getPhotographers (id) {
  const response = await fetch('../data/photographers.json')
  const dataPhotographers = await response.json()
  const selectedPhotographer = dataPhotographers.photographers.find((photographer) => photographer.id == id)
  return selectedPhotographer
}

// Fonction asynchrone pour afficher les informations du photographe dans le header
async function displayDataPhotographer (selectedPhotographer) {
  const photographHeader = document.querySelector('.photograph-header')
  const photographerModel = photographerTemplate(selectedPhotographer)
  console.log(photographerModel)
  const photographerDomDetails = photographerModel.photographerDetails()
  const photographerDomImg = photographerModel.photographerPhoto()
  photographHeader.appendChild(photographerDomDetails)
  photographHeader.appendChild(photographerDomImg)
}

// 3) Fonction pour récupérer les médias du photographe (objet photographe + ses médias)
async function getMediaPhotographers (id) {
  const response = await fetch('../data/photographers.json')
  const data = await response.json()
  const photographerMedia = data.media.filter(media => media.photographerId == id)
  return photographerMedia
}

// Fonction asynchrone pour afficher les médias du photographe
async function displayMediaPhotographer (photographerMedia) {
  const sectionMedia = document.querySelector('.medias')
  const modalContent = document.querySelector('.modal-content')
  sectionMedia.innerHTML = ''
  modalContent.innerHTML = ''
  let totalLikes = 0

  photographerMedia.forEach((mediaData, index) => {
    const mediaModel = mediaTemplate(mediaData)
    const mediaElement = mediaModel.getMediaDom()
    const mediaSlide = mediaModel.getMediaModal()
    const heartIcon = mediaElement.querySelector('.heartIcon')
    const likesText = mediaElement.querySelector('.heartDiv p')
    totalLikes += mediaModel.likeDisplayed

    const mediaItem = mediaElement.querySelector('img, video')
    mediaItem.addEventListener('click', () => showSlides(index))
    mediaItem.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        showSlides(index)
      }
    })
    sectionMedia.appendChild(mediaElement)
    modalContent.appendChild(mediaSlide)

    heartIcon.addEventListener('click', function (e) {
      e.preventDefault()
      if (heartIcon.classList.contains('far')) {
        mediaModel.likeDisplayed++
        likesText.textContent = mediaModel.likeDisplayed
        heartIcon.classList.replace('far', 'fas')
        updateTotalLikes(1)
      } else {
        mediaModel.likeDisplayed--
        likesText.textContent = mediaModel.likeDisplayed
        heartIcon.classList.replace('fas', 'far')
        updateTotalLikes(-1)
      }
    })
    heartIcon.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (heartIcon.classList.contains('far')) {
          mediaModel.likeDisplayed++
          likesText.textContent = mediaModel.likeDisplayed
          heartIcon.classList.replace('far', 'fas')
          updateTotalLikes(1)
        } else {
          mediaModel.likeDisplayed--
          likesText.textContent = mediaModel.likeDisplayed
          heartIcon.classList.replace('fas', 'far')
          updateTotalLikes(-1)
        }
      }
    })  
  })

  displayTotalLike(totalLikes)
}

// Fonction pour trier les médias en fonction du filtre sélectionné
function trieMedia (tableauMedia) {
  const boutonTrier = document.getElementById('tri-select')
  boutonTrier.addEventListener('change', function (e) {
    const selectedValue = e.target.value

    switch (selectedValue) {
      case 'option1':
        tableauMedia.sort((a, b) => b.likes - a.likes)
        break
      case 'option2':
        tableauMedia.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 'option3':
        tableauMedia.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        return
    }
    displayMediaPhotographer(tableauMedia)
  })
}

// Fonction pour afficher le prix du photographe
async function displayPrice (price) {
  const priceElement = document.getElementById('price')
  priceElement.textContent = price + '€ / jour'
}

// Fonction pour afficher le total des likes
function displayTotalLike (totalLike) {
  const totalLikeElement = document.getElementById('totalLike')
  totalLikeElement.textContent = totalLike
}

// Fonction pour mettre à jour dynamiquement le total des likes
function updateTotalLikes (change) {
  const totalLikeElement = document.getElementById('totalLike')
  totalLikeElement.textContent = parseInt(totalLikeElement.textContent) + change
}

// Function pour afficher le nom du photographe

// Fonction pour afficher le nom du photographe
function displayNamePhotographer (photographerName) {
  const photographerNameElement = document.querySelector('.photographer-name')
  photographerNameElement.textContent = photographerName
}

// Fonction d'initialisation qui récupère les données du photographe et affiche les médias
async function init () {
  const selectedPhotographer = await getPhotographers(id)
  displayDataPhotographer(selectedPhotographer)
  displayPrice(selectedPhotographer.price)
  const selectedMedia = await getMediaPhotographers(id)
  displayMediaPhotographer(selectedMedia)
  trieMedia(selectedMedia)
  // Appel de la fonction pour afficher le nom du photographe
  displayNamePhotographer(selectedPhotographer.name)
}

init()
