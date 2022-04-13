import axios from "axios"
const btns = document.getElementsByClassName("btn");
const cartQty = document.getElementById("cartQty")


async function updateCart(pizza) {
    let response = await axios.post('/updateCart', pizza)
    console.log(response)
    cartQty.innerHTML = response.data.totalQnt
}

;[...btns].forEach(btn => {
    btn.addEventListener("click", function (e) {
        let pizza = JSON.parse(this.dataset.pizza)
        updateCart(pizza)
    })
});
