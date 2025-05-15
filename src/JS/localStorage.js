import { updateWishCount, updateCartCount } from "./updateCount";
export function addCartToLocal(product, colored, sized, priced, quantized) {
  console.log("Adding to cart:", product.id, colored, sized, quantized);
  let cart = fetchCartFromLocal();
  const existingItem = cart.find(
    (c) => c.id === product.id && c.color === colored && c.size === sized
  );
  if (!existingItem) {
    cart.push({
      id: product.id,
      color: colored,
      size: sized,
      quantity: quantized,
      price: priced,
    });
  } else {
    existingItem.quantity += quantized;
    existingItem.price = priced * existingItem.quantity;
  }
  localStorage.setItem("cartItem", JSON.stringify(cart));
  updateCartCount();
}
export function removeCartFromLocal(product) {
  let cart = fetchCartFromLocal();
  cart.forEach((c, i) => {
    if (c.id === product.id) {
      cart.splice(i, 1);
    }
  });
  localStorage.setItem("cartItem", JSON.stringify(cart));
  updateCartCount();
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
export function fetchCartFromLocal() {
  return JSON.parse(localStorage.getItem("cartItem") || "[]");
}
export function fetchWishFromLocal() {
  return JSON.parse(localStorage.getItem("wishItem") || "[]");
}
