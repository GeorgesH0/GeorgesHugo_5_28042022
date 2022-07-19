let itemImg = document.getElementsByClassName('item__img');
let picture = itemImg[0];
let title = document.getElementById('title');
let prix = document.getElementById('price');
let description = document.getElementById('description');
let colorSelect = document.getElementById('colors');
let number = document.getElementById('quantity');
let ajout = document.getElementById('addToCart');

//----récupération de l'id du produit
let url = new URL(window.location.href);
let id = url.searchParams.get("id");

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
           colorSelect.innerHTML += "<option value=" + colors[i] + ">" + colors[i] + "</option>"
           };
    });
//-----écoute des deux options disponibles
 colorSelect.addEventListener('change', (event)=>{
     let option = event.target.value
     console.log(option);
 });
 let option = colorSelect;
 number.addEventListener('input', ()=>{
     let chiffres = number.value
     console.log(chiffres);
 });
//----écoute du bouton pour ajouter dans le panier
 ajout.addEventListener('click', (event)=>{
     event.preventDefault()
//----création du produit que je vais ajouter dans le panier
 let produit = {
    idProduit: id,
    colors: option.value,
    quantite: number.value,
   };
   console.log(produit);

//----fonction qui va permettre de ne pas ajouter plusieurs fois le même produit
function checkPanier (produit){
    let saveProductLocalStorage = JSON.parse(localStorage.getItem("produit"));
    console.log(saveProductLocalStorage);
    for (let i = 0; i < saveProductLocalStorage.length; i++){
    let panierId = saveProductLocalStorage[i].idProduit;
    let panierColor = saveProductLocalStorage[i].colors;
    if (panierId === produit.idProduit && panierColor === produit.colors){
        saveProductLocalStorage.push(this.quantite);
    }else if (panierId === produit.idProduit ){
        saveProductLocalStorage.push(this.colors);
        saveProductLocalStorage.push(this.quantite);
    }else{
        saveProductLocalStorage.push(produit);
    }
 }
}

if(saveProductLocalStorage){
    saveProductLocalStorage.push(produit);
    localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));
}else{
    saveProductLocalStorage = [];
    saveProductLocalStorage.push(produit);
    localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));

    console.log(saveProductLocalStorage);
}
} );








