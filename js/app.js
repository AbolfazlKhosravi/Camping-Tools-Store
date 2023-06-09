const cartCenter = document.querySelector(".cartCenter");
const backdrap = document.querySelector(".backdrap");
const cartDom = document.querySelector(".cart");
const navCart = document.querySelector(".nav__cart");
const cancelCart = document.querySelector(".cancel-Cart");
const productsDom = document.querySelector(".products");
const toursDom = document.querySelector(".tours");
const cartItems = document.querySelector(".cart-items");
const totalPrice = document.querySelector(".total-price");
const productsCart = document.querySelector(".products--cart");
const valueCart = document.querySelector(".value-cart i span");
const allClear = document.querySelector(".all-clear");
const confirm = document.querySelector(".confirm");
const discountCart = document.querySelector(".discount-cart");
const PriceAfterDiscount = document.querySelector(".Price-after-discount");
const seachProducts = document.querySelector(".seach--products");

import { toursData } from "../data/tours.js";
import { tourLocalAir } from "../data/tourLocalAir.js";
import { tourLocalLand } from "../data/tourLocalLand.js";
import { productsData } from "../data/products.js";

let cart = [];
let updateAddToCartbtn = [];

class getProducts {
  products() {
    return productsData;
  }
  tours() {
    return toursData;
  }
  airLocal() {
    return tourLocalAir;
  }
  landLocal() {
    return tourLocalLand;
  }
}

class UL {
  constructor() {
    seachProducts.addEventListener("input", (e) => {
      console.log("hhhh");
      let products = productsData.filter((p) =>
        p.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      this.displayProducts(products);
      this.addtocart();
    });
  }
  displayProducts(p) {
    let result = "";
    p.forEach((item) => {
      result += ` <div class="product">
      <div class="product-img">
          <img src=${item.imageUrl} alt="">
      </div>
      <div class="information-products">
         <div class="pricdAdd">
          <p class="price">price <span>${item.price}</span> ${item.title}</p>
          </div>
          <span class="add" data-id="${item.id}"><i class="fa-solid fa-cart-plus"></i></span>
      </div>
    </div>`;
      productsDom.innerHTML = result;
    });
  }
  displayTours(items) {
    let result = "";
    items.forEach((item) => {
      result += ` <div class="tour">
      <h2 class="tour-title">${item.title}</h2>
      <div class="tour-hider">
          <div class="time-tour">Tour duration : <span>${item.time}</span> </div>
          <div class="leader">
              <p class="leder-text">your leader:</p>
              <div class="leader-img">
                 <img src=${item.leaderImg} alt="">
                 <p>${item.leaderName}</p> 
              </div>
          </div>
      </div>
      <div class="tour-hotel">
          <h4 class="hotel-title">Your stay in Sitka for <span>2 day</span></h4>
          <div class="hotel-control">
              <div class="hotel">
                  <p>your hotel</p>
                  <img src=${item.hoteImg} alt="">
               </div>
               <span>and</span>
               <div class="hotel hotel-room">
                  <p>your room</p>
                  <img src=${item.romImg} alt="">
               </div>
          </div>
      </div>
      <div class="tour-camping">
          <h4 class="camping-title">Camping in the following areas</h4>
          <div class="camping-control">
             <div class="camping">
              <div class="camping-img">
               <img src=${item.campingImg1} alt=""> 
              </div>
              <p>${item.plase1}</p>
           </div> 
           <div class="camping">
              <div class="camping-img">
               <img src=${item.imageUrl} alt=""> 
              </div>
              <p>${item.plase2}</p>
           </div> 
           <div class="camping">
              <div class="camping-img">
               <img src=${item.campingImg3} alt=""> 
              </div>
              <p>${item.plase3}</p>
           </div> 
           <div class="camping">
              <div class="camping-img">
               <img src=${item.campingImg4} alt=""> 
              </div>
              <p>${item.plase4}</p>
           </div> 
           <div class="camping">
              <div class="camping-img">
               <img src=${item.campingImg5} alt=""> 
              </div>
              <p>${item.plase5}</p>
           </div> 
           <div class="camping">
              <div class="camping-img">
               <img src=${item.campingImg6} alt=""> 
              </div>
              <p>${item.plase6}</p>
           </div> 
          </div>
      </div>
      <div class="tour-footer">
          <div class="ptice-tour">
              <p class="price" >price <span>${item.price}$</span> ${item.travel1}</p>
              <span class="add" data-id="${item.id}"><i class="fa-solid fa-cart-plus"></i></span>
          </div>
          <div class="ptice-tour ">
              <p class="price ">price <span>${item.price1}$</span>  ${item.travel2}</p>
              <span class="add" data-id="${item.id2}"><i class="fa-solid fa-cart-plus"></i></span>
          </div>
      </div>
    </div>`;
      toursDom.innerHTML = result;
    });
  }
  addtocart() {
    const addToCartbtn1 = [...document.querySelectorAll(".add")];
    updateAddToCartbtn = addToCartbtn1;
    addToCartbtn1.forEach((item) => {
      const id = item.dataset.id;
      const isInCart = cart.find((e) => e.id == parseInt(id));
      if (isInCart) {
        item.style.opacity = 0;
        return;
      }
      item.addEventListener("click", () => {
        item.style.opacity = 0;
        const addCart = { ...storage.callProducts(id), quantity: 1 };
        cart = [...cart, addCart];
        storage.saveCart(cart);
        this.setCartValue(cart);
        this.displayCart(cart);
      });
    });
  }
  setCartValue(cart) {
    let result = 0;
    const price = cart.reduce((crr, acu) => {
      result += acu.quantity;
      return crr + acu.quantity * acu.price;
    }, 0);
    if (price > 1500) {
      let disCount = price * 0.05;
      let priceAfterDiscount = price - disCount;
      discountCart.children[1].innerText = `${disCount.toFixed(2)}`;
      PriceAfterDiscount.children[1].innerText = `${priceAfterDiscount.toFixed(
        2
      )}`;
    } else {
      let disCount = 0;
      discountCart.children[1].innerText = `${disCount.toFixed(2)}`;
      PriceAfterDiscount.children[1].innerText = `${price.toFixed(2)}`;
    }
    cartItems.innerText = result;
    valueCart.innerText = result;
    totalPrice.children[1].innerText = `${price.toFixed(2)} $`;
  }
  displayCart(cart) {
    let result = "";
    cart.forEach((e) => {
      result += `
         <div class="tour--cart">
             <div class="crt-header">
                 <div class="img-cart">
                   <img src=${e.imageUrl} alt="">
                   <p class="title-tour">a${e.title}</p>
                 </div>
                 <span class="trash"><i class="fa-solid fa-trash-can" data-id="${
                   e.id
                 }"></i></span>
             </div>
               <div class="cart-footer">
                 <p>${e.travel}</p>
                 <div class="value">
                     <span class="minus"><i class="fa-solid fa-circle-minus" data-id="${
                       e.id
                     }"></i></span>
                     <p>${e.quantity}</p>
                     <span class="pluse"><i class="fa-solid fa-circle-plus" data-id="${
                       e.id
                     }"></i></span>
                 </div>
                 <p>${(e.price * e.quantity).toFixed(2)} $</p>
               </div>
         </div> `;
      productsCart.innerHTML = result;
    });
  }
  setApp() {
    cart = storage.getCart();
    this.setCartValue(cart);
    this.displayCart(cart);
  }
  cartLogic() {
    allClear.addEventListener("click", () => this.allremove());
    productsCart.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      if (e.target.classList.contains("fa-trash-can")) {
        this.remove(id);
        productsCart.removeChild(
          e.target.parentElement.parentElement.parentElement
        );
      } else if (e.target.classList.contains("fa-circle-plus")) {
        const plusCart = cart.find((e) => e.id == id);
        plusCart.quantity++;
        this.setCartValue(cart);
        storage.saveCart(cart);
        e.target.parentElement.previousElementSibling.innerText =
          plusCart.quantity;
        e.target.parentElement.parentElement.nextElementSibling.innerText = `${(
          plusCart.quantity * plusCart.price
        ).toFixed(2)}`;
      } else if (e.target.classList.contains("fa-circle-minus")) {
        const plusCart = cart.find((e) => e.id == id);

        if (plusCart.quantity == 1) {
          this.remove(id);
          productsCart.removeChild(
            e.target.parentElement.parentElement.parentElement.parentElement
          );
          return;
        }
        plusCart.quantity--;
        this.setCartValue(cart);
        storage.saveCart(cart);
        e.target.parentElement.nextElementSibling.innerText = plusCart.quantity;
        e.target.parentElement.parentElement.nextElementSibling.innerText = `${(
          plusCart.quantity * plusCart.price
        ).toFixed(2)}`;
      }
    });
  }
  allremove() {
    cart.forEach((e) => this.remove(e.id));
    while (productsCart.children.length) {
      productsCart.removeChild(productsCart.children[0]);
    }
  }
  remove(id) {
    console.log(id);
    cart = cart.filter((e) => e.id != id);
    this.setCartValue(cart);
    storage.saveCart(cart);
    this.updateBtn(id);
  }
  updateBtn(id) {
    console.log(id);
    const item = updateAddToCartbtn.find((e) => e.dataset.id == id);
    console.log(item);
    item.style.opacity = 1;
  }
}

class storage {
  static saveproducts(products, airLocal, landLocal) {
    const allproducts = [...products, ...airLocal, ...landLocal];
    localStorage.setItem("products", JSON.stringify(allproducts));
  }
  static callProducts(id) {
    const products = JSON.parse(localStorage.getItem("products"));
    return products.find((e) => e.id == parseInt(id));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const productsData = new getProducts();
  const products = productsData.products();
  const tours = productsData.tours();
  const airLocal = productsData.airLocal();
  const landLocal = productsData.landLocal();
  const ul = new UL();
  ul.displayProducts(products);
  ul.displayTours(tours);
  ul.setApp();
  ul.addtocart();
  ul.cartLogic();
  storage.saveproducts(products, airLocal, landLocal);
});

navCart.addEventListener("click", () => {
  cartCenter.style.maxHeight = "2000vh";
  backdrap.style.display = "block";
  cartDom.style.top = "5%";
});
backdrap.addEventListener("click", () => {
  cartCenter.style.maxHeight = "0";
  backdrap.style.display = "none";
  cartDom.style.top = "-200vh";
});
cancelCart.addEventListener("click", () => {
  cartCenter.style.maxHeight = "0";
  backdrap.style.display = "none";
  cartDom.style.top = "-200vh";
});
confirm.addEventListener("click", () => {
  alert("are you shur");
});
