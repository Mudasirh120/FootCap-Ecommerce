import showProductContainer from "./productContainer.js";
import brandSelect from "./brandSelect.js";
import { updateWishCount, updateCartCount } from "./updateCount.js";
import fetchProducts from "./fetchProdcuts.js";
let Products;
const getProducts = async () => {
  Products = await fetchProducts();
  const navBar = document.querySelector(".main-nav");
  navBar.classList.add("sticky-nav");
  let wishNo = document.querySelector(".wish-no");
  let cartNo = document.querySelector(".cart-no");
  let popularProducts = document.querySelector(".popular-products");
  let specialProducts = document.querySelector(".special-cards");
  let productCard = document.querySelector(".card");
  let popularSelect = document.querySelectorAll(".p-select");
  let modal = document.querySelector(".modal");
  updateWishCount(wishNo);
  updateCartCount(cartNo);
  showProductContainer(
    popularProducts,
    Products,
    productCard,
    modal,
    wishNo,
    cartNo,
    "popular",
    "All"
  );
  brandSelect(
    popularSelect,
    popularProducts,
    Products,
    productCard,
    modal,
    wishNo,
    cartNo,
    "popular"
  );
  showProductContainer(
    specialProducts,
    Products,
    productCard,
    modal,
    wishNo,
    cartNo,
    "special"
  );
};
getProducts();
