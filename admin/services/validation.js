function CheckValue() {
    this.checkEmpty = function (properties,span,blur) {
        document.querySelector(blur).oninput=()=>{
            document.querySelector(span).innerHTML = "";
        }
        if (properties) {
            document.querySelector(span).innerHTML = "";
            return true;
        } else {
            document.querySelector(span).innerHTML = "Vui lòng không để trống!";
            return false;
        }
    }
}const rule = new CheckValue();

 function validator(name, price, screen, backCamera, frontCamera, img, desc, type) {
  
    let isValid = true;
    isValid &= rule.checkEmpty(name,"#alertName","#productName");
    isValid &= rule.checkEmpty(price,"#alertPrice","#productPrice");
    isValid &= rule.checkEmpty(screen,"#alertScreen","#productScreen");
    isValid &= rule.checkEmpty(backCamera,"#alertBackCamera","#productBackCamera");
    isValid &= rule.checkEmpty(frontCamera,"#alertFrontCamera","#productFrontCamera");
    isValid &= rule.checkEmpty(img,"#alertImg","#productImg");
    isValid &= rule.checkEmpty(desc,"#alertDesc","#decs");
    isValid &= rule.checkEmpty(type,"#alertType","#selectType");
    console.log(isValid)
    if (isValid) {
        return true;
    }else{
        return false;
    }
}
function spanEle(){
    let spanOb = {}
    let getSpan = document.querySelectorAll("#myForm span");
    for(let key of getSpan){
        spanOb[key.id] = key.innerHTML;
    }
    return spanOb;
}

function blurOut(){
    let x = document.querySelectorAll("#myForm input");
    for(let keyX of x){
        keyX.onblur=()=>{
            rule.checkEmpty(keyX.value,("#"+keyX.nextElementSibling.id),("#"+ keyX.id));
        }
    }
}
blurOut()


