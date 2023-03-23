function getMyEle(ele) {
    return document.querySelector(ele)
}

const productMethod = new ProductSer;
function getProduct() {
    productMethod.geTProduct().
        then(function (result) {
            viewInTable(result.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}
getProduct()
function clear() {
    getMyEle("#myForm").reset();
    getMyEle(".modelHeader h2").innerHTML = "Add Product"
    getMyEle(".modelFooter .addEle").innerHTML = ""
    getMyEle("#btnAddBox").classList.remove('hiden')
    getClearSpan()
} getMyEle("#btnAdd").addEventListener('click', clear)

function inputProduct() {
    let name = getMyEle("#productName").value;
    let price = getMyEle("#productPrice").value;
    let screen = getMyEle("#productScreen").value;
    let backCamera = getMyEle("#productBackCamera").value;
    let frontCamera = getMyEle("#productFrontCamera").value;
    let img = getMyEle("#productImg").value;
    let desc = getMyEle("#decs").value;
    let type = getMyEle("#selectType").value;
    let valid = validator(name, price, screen, backCamera, frontCamera, img, desc, type)
   console.log(valid)
    if (valid) {
        let product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type)
        productMethod.addProduct(product)
            .then(function (result) {
                getProduct();
                getMyEle("#closeBtn").click()
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}
getMyEle("#btnAddBox").addEventListener('click', inputProduct)

function viewInTable(arr) {
    let content = '';
    arr.forEach(function (object) {
        content += `
        <tr>
        <td>${object.id}</td>
        <td>${object.name}</td>
        <td>${object.price}$</td>
        <td class="imgData"><img src="${object.img}" alt=""></td>
        <td>${object.desc}</td>
        <td>
            <button class="btn btn-info" id="viewBtn" onclick="viewDetail('${object.id}')">xem</button>
            <button class="btn btn-dark"onclick="deletePhone('${object.id}')">xoa</button>
        </td>
    </tr>
        `
    })
    getMyEle("#tableAdminBody").innerHTML = content;
}

function deletePhone(id) {
    productMethod.deleteProduct(id)
        .then(function (result) {
            getProduct()
            alert("Đã xóa thành công!")
        })
        .catch(function (error) {
            console.log(error)
        })
}

function viewDetail(id) {
    getMyEle("#myForm").reset();
    open();
    getClearSpan();
    productMethod.viewProduct(id)
        .then(function (result) {
            console.log(result.data)
            showInModelbox(result.data)
            getMyEle(".modelHeader h2").innerHTML = "Update Product"
            getMyEle(".modelFooter .addEle").innerHTML = `<button id='updateBtn' onclick='updateProduct("${id}")' class='btn btn-info'>Update</button>`
            getMyEle("#btnAddBox").classList.add('hiden')
        })
        .catch(function (error) {
            console.log(error)
        })
}

function showInModelbox(object) {
    getMyEle("#productName").value = object.name;
    getMyEle("#productPrice").value = object.price;
    getMyEle("#productScreen").value = object.screen;
    getMyEle("#productBackCamera").value = object.backCamera;
    getMyEle("#productFrontCamera").value = object.frontCamera;
    getMyEle("#productImg").value = object.img;
    getMyEle("#decs").value = object.desc;
    getMyEle("#selectType").value = object.type;
}

function updateProduct(id) {
    let name = getMyEle("#productName").value;
    let price = getMyEle("#productPrice").value;
    let screen = getMyEle("#productScreen").value;
    let backCamera = getMyEle("#productBackCamera").value;
    let frontCamera = getMyEle("#productFrontCamera").value;
    let img = getMyEle("#productImg").value;
    let desc = getMyEle("#decs").value;
    let type = getMyEle("#selectType").value;
    let updateValid = validator(name, price, screen, backCamera, frontCamera, img, desc, type)
    console.log(updateValid)
    if (updateValid) {
        let product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type)
        productMethod.updateProduct(id, product)
            .then(function (result) {
                getProduct()
                getMyEle("#closeBtn").click()
            })
            .catch(function (error) {
                console.log(error)
            })
    }

}

function getClearSpan(){
   let span = document.querySelectorAll("#myForm span")
   for(let key of span){
    key.innerHTML = ""
   }
}
