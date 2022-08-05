const d = document,
    $price = d.getElementById("iPrice")
    $quantity = d.getElementById("iQuantity")

// Estado
const state = {
    price:0,
    quantity:0
}
//Estado inmutable
const getState = ()=>JSON.parse(JSON.stringify(state))
//Template Ui
const template = () => {
    var {price,quantity}= state;
    if(!typeof price === "number" || !typeof quantity === "number" ) return; 
    const hprice = d.getElementById ("price");
    const hquantity= d.getElementById ("quantity");
    const htotal = d.getElementById ("total");
    hprice.innerHTML= `<p>Price: ${price}</p>`;
    hquantity.innerHTML= `<p>Quantity:${quantity}</p>`;
    htotal.innerHTML= `<p>Total:${price * quantity}</p>`;
}
// Actualizar estado
const setState = (obj)=>{
    for(let key in obj){
        if(state.hasOwnProperty(key)){
            state[key]=obj[key];
        }
    }
    template()
}
d.addEventListener("DOMContentLoaded",template)
d.addEventListener('submit', (e)=>{
    e.preventDefault();
    var lastState = getState()
    if(!e.target.matches("#form")) return false;
    if($price.value == "" && $quantity.value == "") return false;
    lastState.price = $price.value;
    lastState.quantity = $quantity.value;
    console.log(lastState)
    setState(lastState)
    console.log(state)

    $price.value = ""
    $quantity.value = ""
    
})