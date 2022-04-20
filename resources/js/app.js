import axios from "axios"
import Noty from "noty"
const btns = document.getElementsByClassName("btn");
const cartQty = document.getElementById("cartQty")


async function updateCart(pizza) {
    let response = await axios.post('/updateCart', pizza)
    cartQty.innerHTML = response.data.totalQnt

    new Noty({
        text: 'Some notification text',
        timeout:1000,
        sounds:{
            volume:0.5
        }
    }).show();
}

;[...btns].forEach(btn => {
    btn.addEventListener("click", function (e) {
        let pizza = JSON.parse(this.dataset.pizza)
        updateCart(pizza)
    })
});
