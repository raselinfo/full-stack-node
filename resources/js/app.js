import axios from "axios"
import Noty from "noty"
const btns = document.getElementsByClassName("btn");
const cartQty = document.getElementById("cartQty")


async function updateCart(pizza) {

    try {
        let response = await axios.post('/updateCart', pizza)
        cartQty.innerHTML = response.data.totalQnt
        new Noty({
            type: "success",
            text: "Product Added",
            timeout: 1000,
        }).show()
    } catch (err) {
        new Noty({
            type: "error",
            text: "Something Went Wrong!",
            timeout: 1000
        }).show()
    }
}

;[...btns].forEach(btn => {
    btn.addEventListener("click", function (e) {
        let pizza = JSON.parse(this.dataset.pizza)
        updateCart(pizza)
    })
});
