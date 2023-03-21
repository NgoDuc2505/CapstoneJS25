function close(){
    let ele = document.querySelector(".boxModel");
    let isClose = ele.classList.contains("hiden");
    if(!isClose){
        ele.classList.add("hiden") 
    }
}document.getElementById("closeBtn").addEventListener('click',close)

function open(){
    let ele = document.querySelector(".boxModel");
    let isClose = ele.classList.contains("hiden");
    if(isClose){
        ele.classList.remove("hiden")
    }
    
}document.getElementById("btnAdd").addEventListener('click',open)




function clickBlur(){
   close()
}
document.querySelector(".boxLayer").addEventListener('click',clickBlur)
