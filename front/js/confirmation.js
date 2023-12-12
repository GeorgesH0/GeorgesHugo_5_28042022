let validation = document.getElementById('orderId');

let url = new URL(window.location.href);
let id = url.searchParams.get("data.orderId");


let numberCom = id;
validation.innerHTML = numberCom;