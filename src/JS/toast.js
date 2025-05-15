export default function toastMsg(e, src, brand, name) {
  const toastCart = document.querySelector(".toast-msg");
  if (e.classList.contains("shoe-add-to-cart-btn")) {
    toastCart.querySelector(".toast-info").innerText = "was added to cart.";
  } else if (e.classList.contains("shoe-wishlist")) {
    e.getAttribute("name") === "heart-outline"
      ? (toastCart.querySelector(".toast-info").innerText =
          "was added to wishlist.")
      : (toastCart.querySelector(".toast-info").innerText =
          "was removed from wishlist.");
  }
  toastCart.querySelector(".toast-brand").innerText = brand;
  toastCart.querySelector(".toast-shoe").innerText = name;
  toastCart.querySelector(".toast-cart-img").src = src;
  toastCart.showModal();
  setTimeout(() => {
    toastCart.close();
  }, 800);
}
