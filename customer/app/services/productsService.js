function ProductsService(){
    this.getProduct = function(){
       return axios({
            method: 'get',
            url: 'https://64198b7ef398d7d95d428da4.mockapi.io/phoneProduct?fbclid=IwAR3sMfMDAroIyhBjIVXrH6r0t17lDwtQwtDueMU50ej-P8rIUw1GYhVgp9c',
          })
    }
    this.getProductContainID = function(id){
      return axios({
        method: 'get',
        url: `https://64198b7ef398d7d95d428da4.mockapi.io/phoneProduct/${id}`,
      })
    }
};

