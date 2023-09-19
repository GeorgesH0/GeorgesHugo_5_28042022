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

            //getHtml(canapeStorageJSON[i].idProduit)
            updateQuantite()
            suppress()
            getTotalQuantity()
            getTotalPrice()
    })
}


let vanish = document.getElementsByClassName('cart__item__content__settings__delete');


let quantite = document.getElementsByClassName('itemQuantity');

//---fonction qui va permettre de supprimer l'objet du panier
function suppress(){
    for (let i = 0; i < vanish.length; i++){
        vanish[i].addEventListener('click', ()=>{
            vanish[i].closest('.cart__item')
            let check = canapeStorageJSON;
            let erase = check.filter(p => p.idProduit != check.idProduit && p.color != check.color)
            console.log(erase)
            //console.log('okay')
            localStorage.setItem('produit', JSON.stringify(canapeStorageJSON))
        })
    }
};

//---fonction qui permets de modifier la quantité dans le panier
function updateQuantite(){
    for (let i = 0; i < quantite.length; i++){
        quantite[i].addEventListener('change', ()=>{
            quantite[i].closest('.cart__item__content__settings__quantity')
            let check = canapeStorageJSON;
            let foundIndex = check.findIndex(p => p.idProduit != check.idProduit && p.color != check.color);
            //console.log(foundIndex)
            //console.log(quantite[i].closest('.cart__item__content__settings__quantity'))
            if (foundIndex != undefined){
                check[foundIndex].quantite = quantite[i].value;
                //console.log(check[foundIndex].quantite)
                localStorage.setItem('produit', JSON.stringify(canapeStorageJSON));
            }
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
}

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
            console.log(prix);
            totalPrice.innerHTML = prix;
            //console.log(basket[i].quantite);
            //console.log(value.price);
          })
    }
}


let prenom = document.querySelector("div.cart__order__form__question input[name='firstName']");

function firstNameRegExp(){
    let regPrenom = new regExp("^[a-zA-Z\-\é\è\ê\ë\ï\î]+$");
   return regPrenom;
}
prenom.exec(firstNameRegExp());

/*let nom = document.querySelector("div.cart__order__form__question input[name='lastName']");
nom.exec(firstNameRegExp(nom));

let adresse = document.querySelector("div.cart__order__form__question input[name='address']");

function adresseRegExp(adresse){
    return adresse.exec("^[0-9 a-zA-Z\-\é\è\ê\ë\ï\î]+$");
}

adresse.exec(adresseRegExp());

let ville = document.querySelector("div.cart__order__form__question input[name='city']");
ville.exec(firstNameRegExp(ville));

let email = document.querySelector("div.cart__order__form__question input[name='email']");

/*function emailRegExp(email){
    return email.exec("^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$"))
};*/

//----/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/