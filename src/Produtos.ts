import Carrinho from "./Carrinho";

export default class Desserts {
  private _id: number;
  private _name: string;
  private _category: string;
  private _price: number;
  private _imageUrl: string;
  private _quantity: number;
  private quantityElement: HTMLElement | null = null;

  constructor(
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    category: string
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._imageUrl = imageUrl;
    this._quantity = 0;
    this._category = category;
  }

  render(cart: Carrinho) {
    const dessertElement = document.createElement("div");

    dessertElement.innerHTML = `
        <h2>${this.name}</h2>
        <p>${this.category}</p>
        <span>$${this.price.toFixed(2)}</span>
        <img src="${this.imageUrl}" alt="${this.name}">
        <button class="appendItem">Add to Cart</button>
        <button class="removeItem">Remove from Cart</button>
        <span class="quantity">${this.quantity}</span>
    `;

    const buttonAdd = dessertElement.querySelector(".appendItem");
    if (buttonAdd) {
        buttonAdd.addEventListener("click", () => this.addItem(cart));
    }

    const buttonDel = dessertElement.querySelector(".removeItem");
    if (buttonDel) {
        buttonDel.addEventListener("click", () => this.removeItem(cart));
    }

    this.quantityElement = dessertElement.querySelector(".quantity");
    
    return dessertElement;
  }

  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }
  get imageUrl(): string {
    return this._imageUrl;
  }
  get quantity(): number {
    return this._quantity;
  }
  get category(): string {
    return this._category;
  }
  set name(name: string) {
    this._name = name;
  }
  set price(price: number) {
    this._price = price;
  }
  set imageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }
  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  addItem(cart: Carrinho): void {
    this.quantity++;
    if (this.quantityElement) {
      this.quantityElement.textContent = `${this.quantity}`;
    }

    cart.render();
  }

  removeItem(cart: Carrinho): void {
    if (this.quantity > 0) {
      this.quantity--;
    }

    if (this.quantityElement) {
      this.quantityElement.textContent = `${this.quantity}`;
    }

    cart.render();
  }
}