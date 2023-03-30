function cartOpen(){
    document.querySelector('.cartBox').classList.toggle("cartClose")
    document.querySelector(".cartBlur").classList.toggle("blurDisplay")
}
document.querySelector(".cartLink").addEventListener('click',cartOpen)


function cartBlur(){
    cartOpen()
    document.querySelector(".cartBlur").classList.add("blurDisplay")
}
document.querySelector(".cartBlur").addEventListener('click',cartBlur)

function closeCart(){
    cartBlur()
}document.querySelector('#closeCart').addEventListener('click',closeCart)