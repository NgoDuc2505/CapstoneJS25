const productList = new ProductsService;

function getProductList(type = "") {
    productList.getProduct().
        then(function (result) {
            showProduct(result.data, type);
        })
        .catch(function (error) {
            console.log(error)
        })
}
getProductList();

function showProduct(arr, type = "") {
    let newProductList
    if (type === "") newProductList = arr
    else newProductList = arr.filter((product) => product.type === type);
    let content = '';
    newProductList.forEach(function (product) {
        content += `
        <div class="col-12 col-sm-6 col-lg-4 card">
                        <div class="card-content animate__animated animate__zoomIn animate__faster">
                                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                                    <div class="card_body">
                                        <p class="product-title">${product.name}</p>
                                        <p class="product-price">${product.price}$</p>
                                        <p class="product-id">${product.type}</p>
                                        <p class="product-desc">Description: <span>${product.desc}</span></p>
                                        
                                    </div>
                                    <div class="d-flex justify-content-around product-status">
                                            <div class="rating">
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </div>
                                            <p class="product-stock">In stock</p>
                                        </div>
                                <div class="card-overlay">
                                        <p class="overlay-title">Specifications <span></span></p>
                                        <p class="product-screen">Screen: ${product.screen} <span></span></p>
                                        <p class="product-back">Back camera: ${product.backCamera} <span></span></p>
                                        <p class="product-front">Front camera: ${product.frontCamera} <span></span></p>
                                        <p class="product-detail">Click here for more details <span></span></p>
                                        <button class="btnAddtoCart btnStyle" onclick="getProductID(${product.id})">add to card</button>
                            </div>
                        </div>
                        
            </div>
        `
    })
    document.getElementById("allProduct").innerHTML = content;
}

function filterProduct() {
    const allBtnEle = document.getElementById("pills-all-tab")
    const samSungBtnEle = document.getElementById("pills-SamSung-tab")
    const iphoneBtnEle = document.getElementById("pills-Iphone-tab")

    if (!allBtnEle || !samSungBtnEle || !iphoneBtnEle) return;

    allBtnEle.addEventListener("click", () => {
        getProductList()
    })

    samSungBtnEle.addEventListener("click", () => {
        getProductList("Samsung")
    })

    iphoneBtnEle.addEventListener("click", () => {
        getProductList("Iphone")
    })
}

filterProduct()

function getProductID(id) {
    productList.getProductContainID(id)
        .then((result) => {
            let getProductByID = result.data;
            addToCart(getProductByID)
        })
        .catch((error) => {
            console.log(error)
        })
}

let cartItem = [];
let duplicateProduct = [];
function addToCart(product) {
    if (!isExit(product, cartItem).is_exit) {
        product['num'] = 1;
        cartItem.push(product)
        setLocalStorage(cartItem)
        showItemInCart(cartItem)
        showTotalCount()
    } else {
        let getCurrentNum = isExit(product, cartItem).statusNum;
        if (getCurrentNum >= 2) {
            getCurrentNum += 1;
            product['num'] = getCurrentNum;
        } else {
            duplicateProduct.push(product);
            let obb = {};
            duplicateProduct.forEach((item) => {
                obb[item.id] = (obb[item.id] || 1) + 1;
            })
            for (let key of Object.keys(obb))
                if (product.id === key) {
                    product['num'] = obb[key];
                }
        }
        let indexTest = getIndexOfId(product.id)
        cartItem[indexTest] = product;
        setLocalStorage(cartItem)
        showItemInCart(cartItem)
        showTotalCount()
    }
}

function setLocalStorage(cartItem) {
    localStorage.setItem('carTArray', JSON.stringify(cartItem))
};
function getLocalStorage() {
    if (localStorage.getItem("carTArray") != null) {
        cartItem = JSON.parse(localStorage.getItem("carTArray"));
        showItemInCart(cartItem)
    }
} getLocalStorage()


function showItemInCart(cartItem) {
    let rs = cartItem.map((item) => {
        return `
        <div class="cart__product">
        <div class="productInCart">
            <div class="imgProduct">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="infoProduct">
                <p class="product-title">${item.name}</p>
                <p class="product-price">${item.price}$</p></p>
                <p class="product-id">Brand: ${item.type}</p>
            </div>
        </div>
        <div class="quantity">
            <p>Quantity:</p>
            <div class="numberOfItem">
                <button onclick="quantity('${item.id}','${'plus'}')">+</button>
                <span class="numberProduct">${item.num}</span>
                <button onclick="quantity('${item.id}','${'minus'}')">-</button>
            </div>
        </div>
        </div>
        `
    }).join('')
    document.querySelector('.cart_body').innerHTML = rs;
}


function clearCart() {
    cartItem = [];
    setLocalStorage(cartItem)
    getLocalStorage()
    document.getElementById('showTotalCount').innerHTML = 0;
    document.querySelector("#total").innerHTML = 0;
} document.getElementById('clear').addEventListener('click', clearCart)
document.getElementById('pay').addEventListener('click', clearCart)

function isExit(product, arr) {
    if (arr.length == 0) {
        return {
            statusNum: 1,
            is_exit: false
        };
    }
    for (let i = 0; i < arr.length; i++) {
        if (product.id === arr[i].id) {
            product = arr[i];
            return {
                statusNum: arr[i].num,
                is_exit: true
            };
        }
    }
    return {
        statusNum: 1,
        is_exit: false
    };
}

function quantity(id, properties) {
    let indexOfProduct = getIndexOfId(id);
    switch (properties) {
        case 'plus':
            cartItem[indexOfProduct].num += 1;
            setLocalStorage(cartItem)
            showItemInCart(cartItem)
            showTotalCount()
            break;
        case 'minus':
            cartItem[indexOfProduct].num -= 1;
            setLocalStorage(cartItem)
            showItemInCart(cartItem)
            showTotalCount()
            whenCountUnder1(id)
            break;
        default:
            break;
    }
}

function whenCountUnder1(id) {
    for (let key of cartItem) {
        if (key.id == id) {
            if (key.num < 1) {
                let indexid = getIndexOfId(key.id);
                cartItem.splice(indexid, 1)
                setLocalStorage(cartItem)
                showItemInCart(cartItem)
                showTotalCount()
            }
        }
    }
}

function getIndexOfId(id) {
    let arrId = [];
    for (let key of cartItem) {
        arrId.push(key.id)
    }
    let indexOfId = arrId.indexOf(id);
    if (indexOfId > -1) {
        return indexOfId;
    }
}

function showTotalCount() {
    let countArr = [];
    for (let key of cartItem) {
        countArr.push(key.num)
    }
    let total = countArr.reduce(function (result, item) {
        return result + item;
    }, 0)
    document.getElementById('showTotalCount').innerHTML = total;
    solveTotal()
}
showTotalCount()

function solveTotal() {
    let totalPrice = 0;
    for(let key of cartItem){
        let {num,price} = key;
        totalPrice += (num * Number(price))
    }
    document.getElementById("total").innerHTML = totalPrice.toLocaleString();
}solveTotal()