class OurPetCartClass {
  constructor(pid, pname,category, price, rating,imagePath, amount = 1){

      this.pid = pid ; 
      this.name = pname; 
      this.category = category;
      this.rating=Number(rating);
      this.price = Number(price); 
      this.imagePath = imagePath;
      this.amount = Number(amount);

     
  }



  cartTotal() {
      return (this.price * this.amount).toFixed(2);
  }


  
}


export default  OurPetCartClass;   // need to export to allow the outer page access