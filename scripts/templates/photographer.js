export function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;


    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        // Ajout du lien pour la zone focusable h2 + img
        const link = document.createElement('a');
        link.setAttribute("href", `./photographer.html?id=${id}`)
        link.classList.add('link');
        // Paragraphe pour la ville et le pays
        const locationParagraph = document.createElement('p');
        locationParagraph.textContent = city + ", " + country;
        locationParagraph.classList.add('location');
        // Ajout du tagline en paragraphe
        const taglineParagraph = document.createElement('p');
        taglineParagraph.textContent = tagline;
        taglineParagraph.classList.add('tagline');
        // Ajout du Price en paragraphe
        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = price + "€/jour";
        priceParagraph.classList.add('price');

        //Ajout des elements au dom
        article.appendChild(link);
        article.appendChild(locationParagraph);
        article.appendChild(taglineParagraph);
        article.appendChild(priceParagraph);
        link.appendChild(img);
        link.appendChild(h2);

        return (article);
    }
    function photographerDetails() {

        const divDetails = document.createElement('div');
        divDetails.classList.add('photographer-details');

        const h1 = document.createElement('h1');
        h1.textContent = name;
        h1.classList= '.special-h1'

        // Paragraphe pour la ville et le pays
        const locationParagraph = document.createElement('p');
        locationParagraph.textContent = city + ", " + country;
        locationParagraph.classList.add('location');
        // Ajout du tagline en paragraphe
        const taglineParagraph = document.createElement('p');
        taglineParagraph.textContent = tagline;
        taglineParagraph.classList.add('tagline');
        //Ajout des elements au dom
        divDetails.appendChild(h1);
        divDetails.appendChild(locationParagraph);
        divDetails.appendChild(taglineParagraph);

        return (divDetails);
    }
    function photographerPhoto() {

        const divImg = document.createElement('div');
        divImg.classList.add('photographer-img');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        divImg.appendChild(img)


        return (divImg);
    }
    
    return { getUserCardDOM, photographerDetails, photographerPhoto }
}