import fetchProducts from "./fetchProdcuts.js";
let Products;
const getProducts = async () => {
  Products = await fetchProducts();
};
import brandSelect from "./brandSelect.js";
import showProductContainer from "./productContainer.js";
import { updateWishCount, updateCartCount } from "./updateCount.js";
let navBar = document.querySelector(".main-nav");
navBar.classList.add("sticky-nav");
let cartNo = document.querySelector(".cart-no");
let wishNo = document.querySelector(".wish-no");
let modal = document.querySelector(".modal");
let cartProducts = document.querySelector(".cart-products");
let productCard = document.querySelector(".card");
let cartSelect = document.querySelectorAll(".p-select");

updateWishCount(wishNo);
updateCartCount(cartNo);
showProductContainer(
  cartProducts,
  Products,
  productCard,
  modal,
  wishNo,
  cartNo,
  "cart",
  "All"
);
brandSelect(
  cartSelect,
  cartProducts,
  Products,
  productCard,
  modal,
  wishNo,
  cartNo,
  "cart"
);
