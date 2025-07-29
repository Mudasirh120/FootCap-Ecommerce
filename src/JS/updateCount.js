import { fetchCartFromLocal, fetchWishFromLocal } from "./localStorage.js";
export function updateWishCount(wishBtn) {
  let wish = fetchWishFromLocal();
  if (wish) {
    wishBtn.innerText = wish.length;
  } else {
    wishBtn.innerText = 0;
  }
}
export function updateCartCount(cartBtn) {
  let cart = fetchCartFromLocal();
  let cartCount = 0;
  cart.forEach((c) => {
    cartCount += parseInt(c.quantity);
  });
  if (cartCount != 0) {
    cartBtn.innerText = cartCount;
  } else {
    cartBtn.innerText = 0;
  }
}
