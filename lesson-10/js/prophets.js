const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
const cardContainer = document.querySelector("div.cards");
fetch(requestURL)
    .then(response => { return response.json() })
    .then(json => {
        const prophets = json["prophets"];
        prophets.forEach(prophet => {
            //Create the card
            let card = document.createElement("section");

            //Create the H2 element and content
            let h2 = document.createElement("h2");
            h2.textContent = `${prophet.order} - ${prophet.name} ${prophet.lastname}`;

            //Create information blurb element
            let p = document.createElement("p");
            p.innerHTML = `Date of birth: <br> ${prophet.birthdate}<br><br>
                           Place of birth: <br> ${prophet.birthplace}`;

            //Create image element and content
            let image = document.createElement("img");
            image.setAttribute("src", prophet.imageurl);
            image.setAttribute("alt", `Picture of ${prophet.name} ${prophet.lastname} - ${prophet.order}`);

            //Append elements to the card
            card.appendChild(h2);
            card.appendChild(p);
            card.appendChild(image);

            //Append finished card to the DOM
            cardContainer.appendChild(card);
        });
    });