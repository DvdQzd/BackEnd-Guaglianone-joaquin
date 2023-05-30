import fsCart from "fs";
const path = './cart.json';

export class CartManager {

    constructor(path) {
        this.id = 0;
        this.cart = []
        this.path = path;
    }

    addCart() {
        let id = this.id++
        const newProductCar ={
            id,
            products: []
        }
        this.cart.push(newProductCar)
        this.archivarCart()
    }

    getProductsCart() {
        return this.cart;
    }

    getProductsCartId(id) {
        const cartId = this.cart.find(cart => cart.id === id)
        if(!cartId) {
            return "Not Found"
        }else{
            return cartId.products
        }
    }

    addProductsCart(cartID, prodID) {
        const cart = this.getProductsCartId(cartID);
    
        let found = false;
        let quantity = 1;
    
        cart.map(prod => {
            if (prod.product === prodID) {
                found = true;
                return {
                    ...prod,
                    quantity: ++prod.quantity
                };
            }
        });
        
        if (!found) {
            const newProd = {
                product: prodID,
                quantity: quantity
            };
            cart.push(newProd);
        }
        this.updateProductInCart(prodID);
        return true;
    }
    
    archivarCart() {
        const jsonDataCart = JSON.stringify(this.cart);
   console.log(this.path);
   fsCart.writeFile(this.path, jsonDataCart, "utf-8", (error) => {
     if (error) {
       console.log(error);
     } else {
       console.log("Datos archivados correctamente");
     }
   });
    }

    updateProductInCart(prodID) {
        const cartToUpdate = this.cart.find(cart => cart.products.some(prod => prod.product === prodID));
            if (cartToUpdate) {
                const updatedCart = cartToUpdate.products.map(prod => {
                    if (prod.product === prodID) {
                        return {
                            ...prod,
                            quantity: prod.quantity 
                        };
                    }
                    return prod;
                });
                cartToUpdate.products = updatedCart;
                return this.archivarCart();
            }
            return Promise.reject("Cart not found");
      }

}

const cManager = new CartManager(path);