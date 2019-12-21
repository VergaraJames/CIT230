const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
const cardContainer = document.querySelector("div.cardsEvents");
fetch(requestURL)
    .then(response => { return response.json() })
    .then(json => {
        const towns = json["towns"];
        towns.forEach(town => {
            //Create the card
            let card = document.createElement("section");
            if (`${town.name}` == "Preston" || `${town.name}` == "Fish Haven" || `${town.name}` == "Soda Springs") {
                //Create the H2 element and content
                let h2 = document.createElement("h2");
                h2.textContent = `${town.name} `;
                //Create information blurb element
                let p = document.createElement("p");
                p.innerHTML = `Next Events: <br> <hr>
                           ${town.events[0]},<br>
                            ${town.events[1]},<br>
                            ${town.events[2]},<br>
                            ${town.events[3]}                            
                            `;
            };
            //Append elements to the card
            card.appendChild(h2);
            card.appendChild(p);
            //Append finished card to the DOM
            cardContainer.appendChild(card);


        });
    });