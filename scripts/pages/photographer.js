import { photographerTemplate } from "../templates/photographer.js";

import { mediaTemplate } from "../templates/media.js";
// 1) Récupérer l'ID du photographe à partir de l'URL
const url = new URLSearchParams(window.location.search);
const id = url.get('id');
console.log("ID du photographe :", id);

// 2) Je cherche le photographe concerné depuis la liste des photographes
async function getPhotographers(id) {
  const reponse = await fetch("../data/photographers.json");
  const dataPhotographers = await reponse.json();

  const selectedPhotographer = dataPhotographers.photographers.find((photographer) => photographer.id == id);
  return selectedPhotographer;
}

// Fonction asynchrone pour afficher les informations du photographe dans le header
async function displayDataPhotographer(selectedPhotographer) {
  const photographHeader = document.querySelector(".photograph-header");
  // Utilise un template pour créer la représentation DOM du photographe
  const photographerModel = photographerTemplate(selectedPhotographer);
  console.log(photographerModel);
  const photographerDomDetails = photographerModel.photographerDetails();
  const photographerDomImg = photographerModel.photographerPhoto();
  photographHeader.appendChild(photographerDomDetails);
  photographHeader.appendChild(photographerDomImg)
}
// 3) Je cherche ces medias du photographer ( objet photographer + ces medias )
async function getMediaPhotographers(id) {
  const reponse = await fetch("../data/photographers.json");
  const data = await reponse.json();
  const photographerMedia = [];
  
  for (const media of data.media) {
    if (media.photographerId == id) {
      photographerMedia.push(media);
    }
  }
  return photographerMedia;
  
}

async function displayMediaPhotographer(photographerMedia) {
 const sectionMedia = document.querySelector('.medias');
 photographerMedia.forEach(mediaData => {
  const mediaModel = mediaTemplate(mediaData);
  const mediaElement = mediaModel.getMediaDom();
  sectionMedia.appendChild(mediaElement);
});
}
// Fonction asynchrone pour trier les médias en fonction du filtre sélectionné
async function trieMedia(media) {
// //   // Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.getElementById('tri-select');
boutonTrier.addEventListener('change', function(e) {
  const selectedValue = e.target.value;
  // Copie du tableau
  const tableauMedia = Array.from(media);
  
  switch (selectedValue) {
    case 'option1':
        console.log('Popularité sélectionnée');
        // Trie sur la copie du tableau
        tableauMedia.sort( function (a,b) {
          return b.likes - a.likes;
        });
        console.log(tableauMedia);
        break;
    case 'option2':
        console.log('Date sélectionnée');
        // Ajoutez ici le code à exécuter pour l'option Date
        // Trie sur la copie du tableau
        tableauMedia.sort( function (a,b) {
          return b.date - a.date;
        });
        console.log(tableauMedia);
        break;
    case 'option3':
        console.log('Titre sélectionnée');
        // Ajoutez ici le code à exécuter pour l'option Titre
        // Trie sur la copie du tableau
        tableauMedia.sort( function (a,b) {
          return a.title.localeCompare(b.title);
        });
        console.log(tableauMedia);
        break;
    default:
        console.log('Aucune option valide sélectionnée');
        return;
  }
    // Effacement de l'écran et regénération de la page
    document.querySelector(".medias").innerHTML = "";
    //Appel de la fonction pour afficher les medias trier
    displayMediaPhotographer(tableauMedia)
});
console.log(boutonTrier);

}
// Fonction d'initialisation qui récupère les données du photographe et affiche les médias
async function init() {
  // Récupère les datas du photographe
  const selectedPhotographer = await getPhotographers(id);
  displayDataPhotographer(selectedPhotographer);
  const selectedMedia = await getMediaPhotographers(id)
  displayMediaPhotographer(selectedMedia);
  trieMedia(selectedMedia);
}
init();

