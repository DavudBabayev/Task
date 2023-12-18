let url = "http://localhost:3000/card";

async function cards(){
    let res = await axios.get(url);
    let data = await res.data;

    console.log(data);
    
    
}

cards();