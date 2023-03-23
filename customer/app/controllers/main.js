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
                                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                                    <div class="card_body">
                                        <p class="product-title">${product.name}</p>
                                        <p class="product-price">${product.price}</p>
                                        <p class="product-id">${product.type}</p>
                                        <p class="product-desc">Description: <span>${product.desc}</span></p>
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

    samSungBtnEle.addEventListener("click",() => {
        getProductList("Samsung")
    })

    iphoneBtnEle.addEventListener("click", () => {
        getProductList("Iphone")
    })
}

filterProduct()

