export function mediaTemplate(data) {
  const { id, photographerId, title, image, likes, date, price } = data;

  const name = data.name;
  console.log(name);


  const picture = `assets/${photographerId}/${image}`;
  console.log(picture)

  function getMediaDom() {
    const article = document.createElement('article');
    // 
    const img = document.createElement('img')
    img.setAttribute("src", picture)
    article.appendChild(img)

    return article
  }
  return { getMediaDom }
}