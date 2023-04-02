
function ProductSer(){
    this.geTProduct = function(){
       return axios({
            method: 'get',
            url: 'https://64198b7ef398d7d95d428da4.mockapi.io/phoneProduct',
          })
    }
    this.addProduct = function(product){
        return axios({
            method: 'post',
            url: 'https://64198b7ef398d7d95d428da4.mockapi.io/phoneProduct',
            data: product,
          })
    }
    this.viewProduct = function(id){
        return axios({
            method: 'get',
            url: `https://64198b7ef398d7d95d428da4.mockapi.io/phoneProduct/${id}`,
          })
    }
    this.deleteProduct = function(id){
        return axios({
            method: 'delete',
            url: `https://64198b7ef398d7d95d428da4.mockapi.io/phoneProduct/${id}`,
          })
    }
    this.updateProduct = function(id,data){
        return axios({
            method: 'put',
            url: `https://64198b7ef398d7d95d428da4.mockapi.io/phoneProduct/${id}`,
            data: data,
          })
    }
}