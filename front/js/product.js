let itemImg = document.getElementsByClassName('item__img');
let picture = itemImg[0];
let title = document.getElementById('title');
let prix = document.getElementById('price');
let description = document.getElementById('description');
let color = document.getElementById('colors');
let number = document.getElementById('quantity');
let ajout = document.getElementById('addToCart');

//----récupération de l'id du produit
let url = new URL(window.location.href);
let id = url.searchParams.get("id");
let saveProductLocalStorage = [];
//----récupération du produit sur la page d'acceuil
fetch("http://localhost:3000/api/products/" + id )
 .then(function(res) {
     if (res.ok) {
         return res.json()
     }
    }).then(function (value){
        picture.innerHTML = "<img src=" + value.imageUrl + " alt=" + value.altTxt + ">";
        title.innerText = value.name;
        prix.innerText = value.price;
        description.innerText = value.description;
        let colors = value.colors;
       for(let i = 0; i < colors.length; i++){
           color.innerHTML += "<option value=" + colors[i] + ">" + colors[i] + "</option>"
           };
    });

//----écoute du bouton pour ajouter dans le panier
ajout.addEventListener('click', (event)=>{
    event.preventDefault()
//----création du produit que je vais ajouter dans le panier
    let produit ={
        idProduit: id,
        color: color.value,
        quantite: number.value,
    };

    saveProductLocalStorage = JSON.parse(localStorage.getItem("produit"));

    if (saveProductLocalStorage === null) {
        saveProductLocalStorage = [];
        saveProductLocalStorage.push(produit);
        localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));
    } else if (saveProductLocalStorage != null) {
        //console.log(saveProductLocalStorage.length);
        checkPanier(produit);
    };
} );

saveProductLocalStorage = JSON.parse(localStorage.getItem("produit"));


//----fonction qui va permettre de ne pas ajouter plusieurs fois le même produit
function checkPanier(produit) {
    let check = saveProductLocalStorage;
    let foundProduit = check.find(p => p.id == produit.id && p.color == produit.color);
    if (foundProduit != undefined) {
        foundProduit.quantite++;
    } else {
        saveProductLocalStorage.push(produit);
    }
    localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));
}


   
    









