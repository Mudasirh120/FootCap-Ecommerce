import Products from "../../products.json";
import brandSelect from "./brandSelect";
import showProductContainer from "./productContainer";
import { updateWishCount, updateCartCount } from "./updateCount";
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
