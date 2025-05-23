import Products from "../../products.json";
import showProductContainer from "./productContainer";
import { updateWishCount, updateCartCount } from "./updateCount";
import brandSelect from "./brandSelect";
let navBar = document.querySelector(".main-nav");
navBar.classList.add("sticky-nav");
let cartNo = document.querySelector(".cart-no");
let wishNo = document.querySelector(".wish-no");
let modal = document.querySelector(".modal");
let wishesProducts = document.querySelector(".wishes-products");
let productCard = document.querySelector(".card");
let wishSelect = document.querySelectorAll(".p-select");

updateWishCount(wishNo);
updateCartCount(cartNo);
showProductContainer(
  wishesProducts,
  Products,
  productCard,
  modal,
  wishNo,
  cartNo,
  "wishlist",
  "All"
);
brandSelect(
  wishSelect,
  wishesProducts,
  Products,
  productCard,
  modal,
  wishNo,
  cartNo,
  "wishlist"
);
