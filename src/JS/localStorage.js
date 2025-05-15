import { updateWishCount } from "./updateCount";
export function addCartToLocal(product, colored) {
  let cart = fetchCartFromLocal();
  cart.push({
    id: product.id,
    color: getComputedStyle(colored).backgroundColor,
    size: document.querySelector(".current-shoe-size").innerText,
    quantity: document.querySelector(".shoe-quantity").innerText,
    price:
      document.querySelector(".discounted-shoe-price").innerText.slice(1) *
      document.querySelector(".shoe-quantity").innerText,
  });
  localStorage.setItem("cartItem", JSON.stringify(cart));
}
export function addWishToLocal(product, modalWishBtn) {
  let wish = fetchWishFromLocal();
  let alreadyExist = false;
  wish.forEach((w) => {
    if (w.id === product.id) {
      modalWishBtn.setAttribute("name", "heart");
      alreadyExist = true;
    }
  });
  if (!alreadyExist) {
    wish.push({
      id: product.id,
    });
    modalWishBtn.setAttribute("name", "heart");
  }
  localStorage.setItem("wishItem", JSON.stringify(wish));
  updateWishCount();
}
export function removeWishFromLocal(product, modalWishBtn) {
  let wish = fetchWishFromLocal();
  wish.forEach((w, i) => {
    if (w.id == product.id) {
      wish.splice(i, 1);
      modalWishBtn.setAttribute("name", "heart-outline");
    }
  });
  localStorage.setItem("wishItem", JSON.stringify(wish));
  updateWishCount();
}
function fetchCartFromLocal() {
  return JSON.parse(localStorage.getItem("cartItem") || "[]");
}
export function fetchWishFromLocal() {
  return JSON.parse(localStorage.getItem("wishItem") || "[]");
}
