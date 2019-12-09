const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
const cardContainer = document.querySelector("div.cardsww");

fetch(requestURL)
    .then(response => { return response.json() })
    .then(json => {
        const towns = json["towns"];
        towns.forEach(town => {
            //Create the card
            let card = document.createElement("section");
            let cardsEvents = document.createElement("section");
            //Create the H2 element and content
            let h2 = document.createElement("h2");
            h2.textContent = `${town.name} `;
            //Create the H3 element and content
            let h3 = document.createElement("h3");
            h3.textContent = `${town.motto}`;
            if (`${town.name}` == "Preston" || `${town.name}` == "Fish Haven" || `${town.name}` == "Soda Springs") {
                //Create information blurb element
                let p = document.createElement("p");
                p.innerHTML = `Year founded: ${town.yearFounded}<br><br>
                           Population: ${town.currentPopulation}<br><br>
                           Average Rain Fall: ${town.averageRainfall}<br><br> `;
                //Create image element and content
                let image = document.createElement("img");
                image.setAttribute("src", `images/${town.photo}`);
                image.setAttribute("alt", `Picture of ${town.name}`);
                //Append elements to the card
                card.appendChild(h2);
                card.appendChild(h3);
                card.appendChild(p);
                card.appendChild(image);
                //Append finished card to the DOM
                cardContainer.appendChild(card);
            };

        });
    });