import { photographerTemplate } from "../templates/photographer.js";
import { mediaTemplate } from "../templates/media.js";


// 1) Récupérer l'ID du photographe à partir de l'URL
const url = new URLSearchParams(window.location.search);  // Crée une instance de URLSearchParams pour analyser les paramètres de l'URL
const id = url.get('id');  // Récupère l'ID du photographe à partir des paramètres de l'URL
console.log("ID du photographe :", id);

// 2) Fonction pour chercher le photographe concerné depuis la liste des photographes
async function getPhotographers(id) {
  const reponse = await fetch("../data/photographers.json");  // Fait une requête pour obtenir les données des photographes
  const dataPhotographers = await reponse.json();  // Convertit la réponse en format JSON

  // Trouve le photographe correspondant à l'ID fourni
  const selectedPhotographer = dataPhotographers.photographers.find((photographer) => photographer.id == id);
  return selectedPhotographer;  // Retourne les données du photographe sélectionné
}

// Fonction asynchrone pour afficher les informations du photographe dans le header
async function displayDataPhotographer(selectedPhotographer) {
  const photographHeader = document.querySelector(".photograph-header");  // Sélectionne l'élément du DOM où les infos du photographe seront affichées
  
  // Utilise un template pour créer la représentation DOM du photographe
  const photographerModel = photographerTemplate(selectedPhotographer);
  console.log(photographerModel);
  const photographerDomDetails = photographerModel.photographerDetails();  // Crée les détails du photographe
  const photographerDomImg = photographerModel.photographerPhoto();  // Crée la photo du photographe
  
  // Ajoute les éléments au DOM
  photographHeader.appendChild(photographerDomDetails);
  photographHeader.appendChild(photographerDomImg);
}

// 3) Fonction pour récupérer les médias du photographe (objet photographe + ses médias)
async function getMediaPhotographers(id) {
  const reponse = await fetch("../data/photographers.json");  // Fait une requête pour obtenir les données des photographes
  const data = await reponse.json();  // Convertit la réponse en format JSON
  const photographerMedia = [];
  
  // Filtre les médias qui appartiennent au photographe sélectionné
  for (const media of data.media) {
    if (media.photographerId == id) {
      photographerMedia.push(media);
    }
  }
  return photographerMedia;  // Retourne les médias du photographe
}

// Fonction asynchrone pour afficher les médias du photographe
async function displayMediaPhotographer(photographerMedia) {
  const sectionMedia = document.querySelector('.medias'); 
  const modalContent = document.querySelector('.modal-content');  
  sectionMedia.innerHTML = ""; 
  modalContent.innerHTML = "";

  photographerMedia.forEach((mediaData, index) => {
    const mediaModel = mediaTemplate(mediaData);
    const mediaElement = mediaModel.getMediaDom();  // Crée l'élément DOM pour le média
    const mediaSlide = mediaModel.getMediaModal();  // Crée l'élément DOM pour la lightbox

    // Ajoute un événement de clic pour ouvrir la lightbox
    mediaElement.querySelector('img, video').addEventListener('click', () => displayLightbox(index));

    // Ajoute les éléments au DOM
    sectionMedia.appendChild(mediaElement);
    modalContent.appendChild(mediaSlide);
  });
}

// Fonction pour trier les médias en fonction du filtre sélectionné
function trieMedia(tableauMedia) {
  // Sélectionne le menu déroulant pour le tri
  const boutonTrier = document.getElementById('tri-select');  
  boutonTrier.addEventListener('change', function(e) {
    // Récupère la valeur sélectionnée
    const selectedValue = e.target.value;  

    switch (selectedValue) {
      case 'option1':
        console.log('Popularité sélectionnée');
        // Trie les médias par popularité (nombre de likes décroissant)
        tableauMedia.sort((a, b) => b.likes - a.likes);
        console.log(tableauMedia);
        break;
      case 'option2':
        console.log('Date sélectionnée');
        // Trie les médias par date (du plus récent au plus ancien)
        tableauMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(tableauMedia);
        break;
      case 'option3':
        console.log('Titre sélectionnée');
        // Trie les médias par titre (ordre alphabétique)
        tableauMedia.sort((a, b) => a.title.localeCompare(b.title));
        console.log(tableauMedia);
        break;
      default:
        console.log('Aucune option valide sélectionnée');
        return;
    }
    // Appel de la fonction pour afficher les médias triés
    displayMediaPhotographer(tableauMedia);
  });
  console.log(boutonTrier);
}

// Fonction pour afficher le prix du photographe
async function displayPrice(data) {
  const sectionPhotographerPrice = document.querySelector('.photographer-price');  // Sélectionne l'élément du DOM pour le prix
  sectionPhotographerPrice.textContent = data.price + "€ /jour";  // Met à jour le texte avec le prix du photographe
  console.log(sectionPhotographerPrice);
  document.getElementById('body').appendChild(sectionPhotographerPrice);  // Ajoute l'élément au DOM
}

// Fonction d'initialisation qui récupère les données du photographe et affiche les médias
async function init() {
  // Récupère les données du photographe
  const selectedPhotographer = await getPhotographers(id);
  displayDataPhotographer(selectedPhotographer);  // Affiche les données du photographe
  displayPrice(selectedPhotographer);  // Affiche le prix du photographe
  const selectedMedia = await getMediaPhotographers(id);  // Récupère les médias du photographe
  displayMediaPhotographer(selectedMedia);  // Affiche les médias du photographe
  trieMedia(selectedMedia);  // Initialise le tri des médias
}

init();  // Appelle la fonction d'initialisation
