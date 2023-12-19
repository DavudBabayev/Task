let id= new URLSearchParams (window.location.search).get("id");

let card = document.querySelector(".card");

let url = "http://localhost:3000/card/";

async function getCardById(id){
    let res = await axios.get(url + id);
    let data = await res.data

        card.innerHTML += `
        <div>
        <a href="#">${data.tag}</a>
        <img src="${data.image}" alt="">
        <p>${data.text}</p>
        </div>
        `
    };
getCardById(id);