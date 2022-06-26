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

 colorSelect.addEventListener('change', (event)=>{
     let option = event.target.value
     console.log(option);
 });
 number.addEventListener('input', ()=>{
     let chiffres = number.value
     console.log(chiffres);
 });

   let produit = [
    id,
    option,
    chiffres,
   ];
   console.log(produit);
 ajout.addEventListener('click', (event)=>{
     event.preventDefault()
 let myStorage = localStorage;


let saveProductLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(saveProductLocalStorage);

if(saveProductLocalStorage){
    saveProductLocalStorage.push(produit());
    localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));
}else{
    saveProductLocalStorage = [];
    saveProductLocalStorage.push(produit());
    localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));

    console.log(saveProductLocalStorage);
}
} );







