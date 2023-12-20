let url = "http://localhost:3000/card/";
let favurl = 'http://localhost:3000/favs/';

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
        <span>
        <a href="./details.html?id=${elem.id}"><button class="details"><i class="bi bi-info-circle-fill"></i> Details</button></a>
        <button class="delete" onclick = "deleteCard(${elem.id})" ><i class="bi bi-trash"></i> Delete</button>
        <button class="update" onclick = "updateCard(${elem.id})"><i class="bi bi-arrow-clockwise"></i> Update</button>
        </span>
        <i id="fav" class="bi bi-heart" onclick="addFav(${elem.id})" ></i>
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
    let res = await axios.delete(url + id)
    window.location.reload()
    return res.data;
}


////Update////

let form = document.querySelector("form");
let fileInp = document.querySelector("#file");
let imageDiv = document.querySelector("#img2");
let textInp = document.querySelector("#text");
let nameInp = document.querySelector("#name");
let updateDiv = document.querySelector(".updatediv");
let closeBtn = document.querySelector(".bi-x");

fileInp.addEventListener("change", () => {
    let src = fileInp.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(src);
    reader.onload = function (e) {
        imageDiv.src = e.target.result
    }
})

closeBtn.addEventListener("click", () => {
    updateDiv.style.display = "none";
})

function updateCard(id) {
    updateDiv.style.display = "block"
    axios.get(url + id).then(res => {
        nameInp.value = res.data.tag,
        textInp.value = res.data.text,
        fileInp.value = res.data.image,
        imageDiv.src = res.data.image
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        axios.get(url + id).then(res => {
            nameInp.value = res.data.name,
            textInp.value = res.data.text,
            imageDiv.src = res.data.image
        });
        let src = fileInp.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let objetc = {
                tag: nameInp.value,
                image: e.target.result,
                text: textInp.value
            }
            axios.patch(url + id, objetc).then(() => {
                getALLCards();
                updateDiv.style.display = "none"
            })
        }
        reader.readAsDataURL(src)
    })
};

/////////////////FaVORITES/////////////////////

async function addFav(id){
    if(event.target.classList.contains("bi-heart")){
        event.target.classList.remove("bi-heart");
        event.target.classList.add("bi-heart-fill")

        axios.get(url + id).then(res=>{
            return res.data
        }).then(res=>{
            axios.get(favurl).then(response => {
                let aydi = response.data.find(find=> find.id ===response.id);
                if(!aydi){
                    axios.post(favurl, res)
                } else{
                    axios.delete(favurl + id)
                }
            })
        })
    }
    else{
        event.preventDefault();
        event.target.classList.remove('bi-heart-fill');
        event.target.classList.add('bi-heart');
        axios.delete(favurl + id);
    }
}