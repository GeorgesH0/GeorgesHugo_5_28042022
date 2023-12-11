let cartItems = document.getElementById('cart__items');
let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');

//---récupération du localStorage

let canapeStorage = localStorage.getItem('produit');

if (!canapeStorage) {
    console.log("Il n'y a pas d'article présent");
}

let canapeStorageJSON = JSON.parse(canapeStorage);

//---récupération des données des produits via l'API

for (let i = 0; i < canapeStorageJSON.length; i++){
fetch("http://localhost:3000/api/products/" + canapeStorageJSON[i].idProduit )
 .then(function(res) {
     if (res.ok) {
         return res.json()
     }
    }).then(function(value){
        let article = "<article class=cart__item data-id={product-ID} data-color={product-color}>"
        let divImg = "<div class=cart__item__img" + ">"
        let image = "<img src=" + value.imageUrl + " alt=" + value.altTxt + ">"
        let divImgClose = "</div>"
        let divContent = "<div class=cart__item__content>"
        let divDescription = "<div class=cart__item__content__description>"
        let titre = "<h2>" + value.name + "</h2>"
        let colors = "<p>" + canapeStorageJSON[i].color + "</p>"
        let price = "<p>" + value.price + "€</p>"
        let divDescriptionClose = "</div>"
        let divSettings = "<div class=cart__item__content__settings>"
        let divQuantity = "<div class=cart__item__content__settings__quantity>"
        let quantity = "<p>Qté : </p>"
        let numbers = "<input type=number class=itemQuantity name=itemQuantity min=1 max=100 value=" + canapeStorageJSON[i].quantite + ">"
        let divQuantityClose = "</div>"
        let divDelete = "<div class=cart__item__content__settings__delete>"
        let supprimer = "<p class=deleteItem>Supprimer</p>"
        let divDeleteClose = "</div>"
        let divSettingsClose = "</div>"
        let divContentClose = "</div>"
        let articleClose = "</article>"
        cartItems.innerHTML += article + divImg + image + divImgClose + divContent + divDescription + titre + colors + price + divDescriptionClose + divSettings + divQuantity + quantity + numbers + divQuantityClose + divDelete + supprimer + divDeleteClose + divSettingsClose + divContentClose + articleClose

        updateQuantite()
        suppress()
        getTotalQuantity()
        getTotalPrice()
    })
};


let vanish = document.getElementsByClassName('cart__item__content__settings__delete');


let quantite = document.getElementsByClassName('itemQuantity');

//---fonction qui va permettre de supprimer l'objet du panier

function suppress(){
    for (let i = 0; i < vanish.length; i++){
        vanish[i].addEventListener('click', ()=>{
            vanish[i].closest('.cart__item__content__settings__delete')
            console.log(vanish[i]);
            let check = canapeStorageJSON;
            console.log(check[i])
            let supr = check.splice(i, 1);
            console.log(check)
            localStorage.setItem('produit', JSON.stringify(check));
            if (supr != null){
                location.reload();
            }
        })
    }
};

//---fonction qui permets de modifier la quantité dans le panier

function updateQuantite(){
    for (let i = 0; i < quantite.length; i++){
        quantite[i].addEventListener('change', ()=>{
            quantite[i].closest('.cart__item__content__settings__quantity')
            let check = canapeStorageJSON;
            check[i].quantite = quantite[i].value;
            localStorage.setItem('produit', JSON.stringify(check));
            getTotalPrice();
            getTotalQuantity();
            location.reload();
        })
    }
};

//---fonction qui permet de calculer la quantité total

function getTotalQuantity(){
    let basket = canapeStorageJSON;
    let number = 0;
    for(let product of basket){
        number += parseInt(product.quantite,10);
    }
    return number;
};

totalQuantity.innerHTML = getTotalQuantity();

//---fonction qui va permettre de calculer le prix total

function getTotalPrice(){
    let prix = 0;
    let basket = canapeStorageJSON;
    for(let i = 0; i < basket.length; i++){
        fetch("http://localhost:3000/api/products/" + basket[i].idProduit )
          .then(function(res) {
              if (res.ok) {
                return res.json()
              }
          }).then(function(value){
            prix += parseInt(value.price * basket[i].quantite,10);
            totalPrice.innerHTML = prix;
          })
    }
};


let form = document.querySelector(".cart__order__form");


//--- Ecoute du Prénom

let firstName
form.firstName.addEventListener('change', function(){
    validFirstName(this);
});

//---- Validation du Prénom

const validFirstName = function(inputFirstName){
    let regPrenom = new RegExp("^[a-zA-Z\-\é\è\ê\ë\ï\î\ç\ù]+$");
    let testFirstName = regPrenom.test(inputFirstName.value);
    let firstNameError = inputFirstName.nextElementSibling;
    if (testFirstName) {
        firstNameError.innerHTML = 'Valide';
        return inputFirstName.value
    } else {
        firstNameError.innerHTML = 'Erreur de notation';
    }
};

//--- Ecoute du Nom

let lastName
form.lastName.addEventListener('change', function(){
    validLastName(this);
});

//---- Validation du Nom

const validLastName = function(inputLastName){
    let regLastName = new RegExp("^[a-zA-Z\-\é\è\ê\ë\ï\î\ç\ù]+$");
    let testLastName = regLastName.test(inputLastName.value);
    let lastNameError = inputLastName.nextElementSibling;
    if (testLastName) {
        lastNameError.innerHTML = 'Valide';
        return inputLastName.value
    } else {
        lastNameError.innerHTML = 'Erreur de notation';
    }
};

//--- Ecoute de l'adresse

let address
form.address.addEventListener('change', function(){
    validAddress(this);
});

//--- Validation de l'adresse

const validAddress = function(inputAddress){
    let regAddress = new RegExp("^[0-9]+ [a-zA-Z\-\é\è\ê\ë\ï\î\ç ]+$");
    let testAddress = regAddress.test(inputAddress.value);
    let addressError = inputAddress.nextElementSibling;
    if (testAddress) {
        addressError.innerHTML = 'Valide';
        return inputAddress.value
    } else {
        addressError.innerHTML = 'Erreur de notation';
    }
};

//--- Ecoute de la Ville
let city
form.city.addEventListener('change', function(){
    validCity(this);
});

//--- Validation de la Ville

const validCity = function(inputCity){
    let regCity = new RegExp("^[a-zA-Z\-\é\è\ê\ë\ï\î\ç\ù ]+$");
    let testCity = regCity.test(inputCity.value);
    let cityError = inputCity.nextElementSibling;
    if (testCity) {
        cityError.innerHTML = 'Valide';
        return inputCity.value
    } else {
        cityError.innerHTML = 'Erreur de notation';
    }
};

//--- Ecoute de l'Email
let email
form.email.addEventListener('change', function(){
    email = validEmail(this);
});

//--- Validation de l'Email

const validEmail = function(inputEmail){
    let regEmail = new RegExp("^[a-zA-Z0-9.-_éèïëêîùç]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
    let testEmail = regEmail.test(inputEmail.value);
    let emailError = inputEmail.nextElementSibling;
    if (testEmail) {
        emailError.innerHTML = 'Valide';
        return inputEmail.value
    } else {
        emailError.innerHTML = 'Erreur de notation';
    }
};

//--- création d'un objet pour les informations de l'utilisateurs

let contact = {
    prenom: firstName,
    nom: lastName,
    adresse: address,
    ville: city,
    mail: email,   
};

let confirm ={
    contact,
    canapeStorageJSON,
    orderid: canapeStorageJSON[0].idProduit,
};

//--- Requête Post pour la page confirmation


document.querySelector("#order").addEventListener('click',function(e){
    e.preventDefault()
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(confirm),
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("abc")
        // Après validation, on renvoi à la page confirmation
        setTimeout(function() {
            window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
        }, 3000);
        console.log("cdx")
        // On vide les différents storages
        /*sessionStorage.clear();
        localStorage.clear();*/
      })
});
