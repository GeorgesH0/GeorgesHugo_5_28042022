let items = document.getElementById('items');

//-----Récupération des produits via l'API
fetch("http://localhost:3000/api/products")
 .then(function(res) {
     if (res.ok) {
         return res.json()
     }
    }).then(function(value){
        for (let i = 0; i < value.length; i++){
             let link = "<a href=./product.html?id=" + value[i]._id + ">"
             let articleOpen = "<article>"
             let picture = "<img src=" + value[i].imageUrl + " alt=" + value[i].altTxt + ">"
             let titre = "<h3 class=productName>" + value[i].name + "</h3>"
             let description = "<p class=productDescription>" + value[i].description + "</p>"
             let articleClose = "</article>"
             let liensClose = "</a>"
            items.innerHTML += link + articleOpen + picture + titre + description + articleClose + liensClose
            console.log(items)
        }
     console.log(value)
 });
