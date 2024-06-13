export function mediaTemplate (data) {
  const { id, photographerId, title, image, video, likes } = data

  const mediaVideo = `assets/${photographerId}/${video}`
  const picture = `assets/${photographerId}/${image}`
  const likeDisplayed = parseInt(likes)
  console.log(likeDisplayed)

  function getMediaDom () {
    const article = document.createElement('article')
    article.id = id

    const media = document.createElement('div')
    media.setAttribute('class', 'media')
    article.appendChild(media)

    if (image) {
      // Creation de l'element image
      const img = document.createElement('img')
      img.setAttribute('src', picture)
      img.setAttribute('alt', title)
      media.appendChild(img)
    }
    if (video) {
      const video = document.createElement('video')
      video.setAttribute('src', mediaVideo)
      video.setAttribute('type', 'video/mp4')
      video.controls = true
      media.appendChild(video)
    }
    // Creation du bloc titre
    const titleMedia = document.createElement('div')
    titleMedia.setAttribute('class', 'titleMedia')
    article.appendChild(titleMedia)
    // Creation du titre
    const titleText = document.createElement('h3')
    titleText.textContent = title
    titleMedia.appendChild(titleText)
    // Creation du bloc coeur
    const heartDiv = document.createElement('div')
    heartDiv.setAttribute('class', 'heartDiv')
    titleMedia.appendChild(heartDiv)
    // Creation du like
    const likesText = document.createElement('p')
    likesText.textContent = likes
    heartDiv.appendChild(likesText)
    // Creation de l'icone coeur
    const heartIcon = document.createElement('i')
    heartIcon.setAttribute('class', 'heartIcon far fa-heart')
    // Ajout de l'aria-label pour l'accessibilité
    heartIcon.setAttribute('aria-label', 'likes')
    heartDiv.appendChild(heartIcon)
    return article
  }
  function getMediaModal () {
    const mySlide = document.createElement('div')
    mySlide.setAttribute('class', 'mySlides')

    if (image) {
      // Creation de l'element image
      const img = document.createElement('img')
      img.setAttribute('src', picture)
      img.setAttribute('alt', title)
      img.setAttribute('aria-label', 'image closeup view')
      mySlide.appendChild(img)
    }
    if (video) {
      const videoElement = document.createElement('video')
      videoElement.setAttribute('src', mediaVideo)
      videoElement.setAttribute('type', 'video/mp4')
      videoElement.controls = true
      mySlide.appendChild(videoElement)
    }
    return mySlide
  }
  return { getMediaDom, getMediaModal, likeDisplayed }
}
