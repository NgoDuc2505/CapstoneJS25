function validator(){
    let productName = document.querySelector("#productName").value;
    let productPrice = document.querySelector("#productPrice").value;
    let productScreen = document.querySelector("#productScreen").value;
    let productBackCamera = document.querySelector("#productBackCamera").value;
    let productFrontCamera = document.querySelector("#productFrontCamera").value;
    let productImg = document.querySelector("#productImg").value;
    let decs = document.querySelector("#decs").value;
    let selectType = document.querySelector("#selectType").value;
    let product = new productObj(productName,productPrice,productScreen,productBackCamera,productFrontCamera,productImg,decs,selectType);
    console.log(product)
    console.log(Object.values(product))
}
document.querySelector("#btnAddBox").addEventListener('click',validator)


function productObj(productName,productPrice,productScreen,productBackCamera,productFrontCamera,productImg,decs,selectType){
    this.productName =productName;
    this.productPrice = productPrice;
    this.productScreen = productScreen;
    this.productBackCamera = productBackCamera;
    this.productFrontCamera = productFrontCamera;
    this.productImg =productImg;
    this.decs = decs;
    this.selectType = selectType;
}



function checkValue(){
    this.checkEmpty = function(product){
        for(var key of Object.values(product)){
            if(key){
                console.log(true)
            }else{console.log(false)}
        }
    }
}