class OurPetCartClass {
  constructor(pid, pname, category, price, amount, rating) {
    this.pid = pid;
    this.name = pname;
    this.category = category;
    this.rating = Number(rating);
    this.price = Number(price);
    this.amount = Number(amount);
  }

  cartTotal() {
    return (this.price * this.amount).toFixed(2);
  }
}

export default OurPetCartClass; // need to export to allow the outer page access
