const d = document,
    $price = d.getElementById("iPrice")
    $quantity = d.getElementById("iQuantity")

//Crea el html 
const template = (data)=>{
    const html = `
    <div>
    
    <div id="price"> Price: ${data.price}</div>
    
    <div id="quantity">Quantity:${data.quantity}</div>
    
    <div id="total">Total :${data.price * data.quantity}</div>
    </div>
    `
    return html
};

//Actualiza la ui
const render = (data)=>{
    const hprice = document.getElementById ("root");
    hprice.innerHTML = template(data)
};
// Estado inicial
const initialState = {
    price:0,
    quantity:0
};
//estado inmutable
function getState (obj=initialState) {
    var a = JSON.parse(JSON.stringify(obj))
    return a
}
//Se usa el Proxy como un Watcher
const driver = {
    get(obj,prop){
        return obj[prop]
    },
    set(obj,prop,value){
        console.log("set")
        if(Object.keys(obj).indexOf(prop)===-1){
            return console.error(`The Prop: ${prop} not exist`)
        }
        obj[prop]=value
        render(proxy)
    }
};
const setState = (data) => {
    console.log(data)
    for(let key in data){
        if(!data[key] == ""){
            
            if(proxy.hasOwnProperty(key)){
                
                proxy[key]=data[key];
                
                
            }
        }
    }
}
const proxy = new Proxy(getState(initialState), driver)


//FORMULARIO
d.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!e.target.matches("#form")) return false;// identifica el formulario
    if($price.value == "" && $quantity.value == "") return false;
    var data = getState(proxy)
    data.price = $price.value;
    data.quantity = $quantity.value;
    
    setState(data)
    
    $price.value = ""
    $quantity.value = ""
    
})


d.addEventListener("DOMContentLoaded",render(proxy))