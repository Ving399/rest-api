
const APIKEY = 'live_Pm22G7kwLyHBwtPniT0aDchEgXZZfdLDaNuXqdCC1rO1aIjVfPrxi8XBs15A5yrD';

const API_URL_RAND = `https://api.thecatapi.com/v1/images/search?api_key=${APIKEY}&limit=2`;
const API_URL_FAVS =`https://api.thecatapi.com/v1/favourites?api_key=${APIKEY}&limit=40`;
const API_URL_FAVS_DELETES = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${APIKEY}&limit=40`;
const API_URL_UP =`https://api.thecatapi.com/v1/images/upload?api_key=${APIKEY}`;


const spanError = document.getElementById('error');

//Metimos todo en el reload para siempre que se presione el button haga la solicitud GET
async function loadRandMichis(){
    const res = await fetch(API_URL_RAND); 
    const data = await res.json();
    console.log('randoms');
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status;
    } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavMichis(data[0].id);
    btn2.onclick = () => saveFavMichis(data[1].id);
    }
}

//para cargar michis favoritos
async function loadFavMichis(){

    const res = await fetch(API_URL_FAVS); 
    const data = await res.json();
    console.log('favoritos');
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status;
    } else {

        const section = document.getElementById('favoritesMichis');
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi =>{
           const article = document.createElement('article');
           const img = document.createElement('img');
           const btn = document.createElement('button');
           const btnText = document.createTextNode('Sacar al michi');
           
           img.src =michi.image.url
           img.width = 150;
           btn.appendChild(btnText);
           btn.onclick = () => deleteFavMichi(michi.id);
           article.appendChild(img);
           article.appendChild(btn);
           section.appendChild(article);
        });
    }
}

async function saveFavMichis(id){
    const res = await  fetch(API_URL_FAVS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: id
        })
    });

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status;
    }else {
        console.log('Michi guardado en favs')
        loadFavMichis()
    }
}

async function deleteFavMichi(id) {
    const res = await  fetch(API_URL_FAVS_DELETES(id), {
        method: 'DELETE',
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status;
    }else {
        console.log('Michi quitado')
        loadFavMichis();
    }
}


async function uploadMichi() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(API_URL_UP, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data'
        },
        body: formData,
    }) 
    console.log('foto subida');
}


//poniendo reload aqui llamas a la funcion siempre que ermine de cargar
loadRandMichis(); 
loadFavMichis();