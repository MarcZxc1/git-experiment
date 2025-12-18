// Shopping cart module
class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem(item) {
    this.items.push(item);
    this.calculateTotal();
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  }

  getItemCount() {
    return this.items.length;
  }
}

export default ShoppingCart;

