import Produtos from "./Produtos";

export default class Cart {
    private _items: Produtos[];

    private _totalPrice: HTMLElement | null = null;
    private _totalDesserts: HTMLElement | null = null;

    get items(): Produtos[] {
        return this._items;
    }

    get totalPrice(): number {
        return this._items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    
      get totalItems(): number {
        return this._items.reduce((total, item) => total + item.quantity, 0);
      }
    constructor(items: Produtos[]) {
        this._items = items;

        this._totalDesserts = document.querySelector(".totalItems");
        this._totalPrice = document.querySelector(".totalPrice");
    }

    render() {
        const div = document.getElementById('cartBlock');
        const titleCount: string = `<h2>Your Cart (${this.totalItems})</h2>`;
        
        if (!div) {
            throw new Error("Element not found.");
        }
        
        div.innerHTML = titleCount;

        const divList = document.createElement('div');
        divList.innerHTML = this.loadInfoCart();
        div.appendChild(divList);
        
        
        div.innerHTML += `
        <p class="cart-total">Total: $${this.totalPrice.toFixed(2)}</p>
        <button class="confirm-order">Confirm Order</button>
        `;

  return div;
}


    loadInfoCart(): string {
        
        let insertList: string = ``;
        let isEmpty = true;

        for (const desserts of this.items) {
            if (desserts.quantity > 0) {
                isEmpty = false;
                insertList += `
                <div class="desserts">
                    <h2>${desserts.name}</h2>
                    <span>Quantity: ${desserts.quantity}</span>
                    <span>Price: $${desserts.price.toFixed(2)}</span>
                    <span>Total: $${(desserts.price * desserts.quantity).toFixed(2)}</span>
                </div>
                `;
            }
        }

        if (isEmpty) {
            insertList += `<p>Your added items will appear here</p>`;
        }

        return insertList;
    }
}