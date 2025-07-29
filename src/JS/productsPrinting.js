import { fetchWishFromLocal, fetchCartFromLocal } from "./localStorage.js";
let specialNumber = 0;
export function showPopularProducts(
  productContainer,
  productClone,
  activeBrand
) {
  if (productClone.querySelector(".product-tag").textContent === "Popular") {
    let brand = productClone.querySelector(".brand-logo").alt;
    if (activeBrand === "All") {
      productContainer.append(productClone);
    }
    if (activeBrand === brand) {
      productContainer.append(productClone);
    }
  }
}
export function showSpecialProducts(productContainer, productClone) {
  if (
    productClone.querySelector(".product-tag").textContent === "Special" &&
    specialNumber < 3
  ) {
    productContainer.append(productClone);
    specialNumber++;
  }
}
export function showWishesProducts(
  productContainer,
  productClone,
  activeBrand
) {
  let wishes = fetchWishFromLocal();
  wishes.forEach((w) => {
    let pCard = productClone.querySelector(".product-card");
    try {
      let brand = productClone.querySelector(".brand-logo").getAttribute("alt");
      if (w.id === parseInt(pCard.getAttribute("id"))) {
        if (activeBrand === "All") {
          productContainer.append(productClone);
        }
        if (activeBrand === brand) {
          productContainer.append(productClone);
        }
      }
    } catch (error) {
      console.log(pCard);
    }
  });
}
export function showCartProducts(productContainer, productClone, activeBrand) {
  let carts = fetchCartFromLocal();
  carts.forEach((c) => {
    let pCard = productClone.querySelector(".product-card");
    try {
      let brand = productClone.querySelector(".brand-logo").getAttribute("alt");
      if (c.id === parseInt(pCard.getAttribute("id"))) {
        if (activeBrand === "All") {
          productContainer.append(productClone);
        }
        if (activeBrand === brand) {
          productContainer.append(productClone);
        }
      }
    } catch (error) {
      console.log(pCard);
    }
  });
}
