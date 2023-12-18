let url = "http://localhost:3000/card";

let card = document.querySelector(".card");
let searchInp = document.querySelector("#search");
let yaddashArr = [];
let filterArr = [];
let mu = 3;
let loadBtn = document.querySelector(".load");


async function getAllCards(){
    let res = await axios.get(url);
    let data = await res.data;

    yaddashArr = data;

    card.innerHTML = "";
    filterArr = filterArr.length || searchInp.value ? filterArr : data;

    filterArr.slice(0, mu).forEach(elem => {
        card.innerHTML += `
        <div>
        <a href="#">${elem.tag}</a>
        <img src="${elem.image}" alt="">
        <p>${elem.text}</p>
        </div>
        `
    });

}

getAllCards();

////Load More////

loadBtn.addEventListener("click", ()=>{
    mu +=3;
    getAllCards();
});

////Search////

searchInp.addEventListener("input", (e) => {
    filterArr = yaddashArr;
    filterArr = filterArr.filter((element) => {
        return element.tag.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
    });
    getAllCards();
});