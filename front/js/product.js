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
        color: option.value,
        quantite: number.value,
       };
       console.log(produit);
    
     let saveProductLocalStorage = JSON.parse(localStorage.getItem("produit"));
       console.log(saveProductLocalStorage);
    
//----fonction qui va permettre de ne pas ajouter plusieurs fois le même produit
    function checkPanier (produit){
        for (let i = 0; i < saveProductLocalStorage.length; i++){
            console.log("test");
            let panierId = saveProductLocalStorage[i].idProduit;
            let panierColor = saveProductLocalStorage[i].color;
            if (panierId === produit.idProduit && panierColor === produit.color){
                let localQty = parseInt(saveProductLocalStorage[i].quantite);
                let produitQty = parseInt(produit.quantite);
                localQty += produitQty;
                saveProductLocalStorage[i].quantite = localQty;
                localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));
                console.log("toto");
                return
            }else {
                saveProductLocalStorage.push(produit);
                localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));
                return
            }
            
        }
    }
    if(saveProductLocalStorage == null) {
        saveProductLocalStorage = [];
        saveProductLocalStorage.push(produit);
        localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));
    } else if (saveProductLocalStorage != null) {
        checkPanier(produit);
        localStorage.setItem("produit", JSON.stringify(saveProductLocalStorage));
        
    }
    
} );








