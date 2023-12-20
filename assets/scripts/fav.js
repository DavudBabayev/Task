let favurl = 'http://localhost:3000/favs/';

let card = document.querySelector(".card");
let searchInp = document.querySelector("#search");
let yaddashArr = [];
let filterArr = [];
let mu = 3;
let loadBtn = document.querySelector(".load");

async function getAllCards(){
    let res = await axios.get(favurl);
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
        <span>
        <a href="./details.html?id=${elem.id}"><button class="details"><i class="bi bi-info-circle-fill"></i> Details</button></a>
        <button class="delete" onclick = "deleteCard(${elem.id})" ><i class="bi bi-trash"></i> Delete</button>
        </span>
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

////Delete////

async function deleteCard(id){
    let res = await axios.delete(favurl + id)
    window.location.reload()
    return res.data;
}