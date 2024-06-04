// Ajouter un écouteur d'événements pour la touche Échap pour fermer la lightbox
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    plusSlides(-1, event);
  } else if (event.key === "ArrowRight") {
    plusSlides(1, event);
  }
});

//Fonction pour afficher la lightbox avec une diapositive spécifique
function displayLightbox(index) {
  // Sélectionne la lightbox
  const modal = document.getElementById("lightbox");
  // Sélectionne toutes les diapositives de la lightbox
  const slides = modal.getElementsByClassName("mySlides");
  // Sélectionne le texte de légende
  const captionText = document.getElementById("caption");

  // Cache l'affichage des diapositives précédentes
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Affiche la diapositive spécifiée
  slides[index].style.display = "block";
  // Met à jour le texte de légende avec le contenu de la diapositive
  captionText.textContent = slides[index].querySelector('img, video').alt || '';
  
  // Affiche la lightbox
  modal.style.display = "block";
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  // Sélectionne la lightbox et la masque
  const modal = document.getElementById("lightbox");
  // Cache la lightbox
  modal.style.display = "none";
}

// Fonction pour afficher une diapositive spécifique
function showSlides(n) {
  // Sélectionne la lightbox
  const modal = document.getElementById("lightbox");
  // Sélectionne toutes les diapositives de la lightbox
  const slides = modal.getElementsByClassName("mySlides");
  // Sélectionne le texte de légende
  const captionText = document.getElementById("caption");

  // Assure que l'index de la diapositive reste dans les limites du tableau
  if (n >= slides.length) { slideIndex = 0; }
  if (n < 0) { slideIndex = slides.length - 1; }

  // Cache l'affichage des diapositives précédentes
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Affiche la diapositive spécifiée
  slides[slideIndex].style.display = "block";
  // Met à jour le texte de légende avec le contenu de la diapositive
  captionText.textContent = slides[slideIndex].querySelector('img, video').alt || '';
}

// Index de la diapositive actuellement affichée
let slideIndex = 0;

// Fonction pour naviguer à travers les diapositives
function plusSlides(n) {
  // Incrémente l'index de la diapositive et affiche la diapositive correspondante
  slideIndex += n;
  showSlides(slideIndex);
}

// Fonction pour afficher une diapositive spécifique
function currentSlide(n) {
  // Met à jour l'index de la diapositive et affiche la diapositive correspondante
  slideIndex = n;
  showSlides(slideIndex);
}
