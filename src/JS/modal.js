import toastMsg from "./toast";
import {
  addCartToLocal,
  addWishToLocal,
  removeWishFromLocal,
  fetchWishFromLocal,
} from "./localStorage";
export default function showModalContent(
  modal,
  product,
  button,
  wishNo,
  cartNo
) {
  const card = button.closest(".product-card");
  const ogPrice = card.querySelector(".original-price");
  const newPrice = card.querySelector(".product-price");
  let colors = 1;
  const colorContainer = document.querySelector(".available-colors");
  colorContainer.innerHTML = "";
  let sizes = 1;
  const sizeContainer = document.querySelector(".available-sizes");
  sizeContainer.innerHTML = "";
  const imageContainer = document.querySelector(".shoe-image-choices");
  imageContainer.innerHTML = "";
  const plusButton = document.querySelector(".increase-quantity");
  const minusButton = document.querySelector(".decrease-quantity");
  const shoeQuantityText = document.querySelector(".shoe-quantity");
  let shoeQuantity = 1;
  shoeQuantityText.innerText = shoeQuantity;
  plusButton.addEventListener("click", () => {
    if (shoeQuantity < product.quantity) {
      shoeQuantity++;
      shoeQuantityText.innerText = shoeQuantity;
    } else {
      shoeQuantityText.innerText = product.quantity;
    }
  });
  minusButton.addEventListener("click", () => {
    if (shoeQuantity > 1) {
      shoeQuantity--;
      shoeQuantityText.innerText = shoeQuantity;
    } else {
      shoeQuantityText.innerText = 1;
    }
  });
  modal.querySelector(".shoe-image").src = product.image;
  modal.querySelector(".shoe-brand").innerText = product.brand[1];
  modal.querySelector(".shoe-title").innerText = product.name;
  modal.querySelector(".discounted-shoe-price").innerText = newPrice.innerText;
  modal.querySelector(".original-shoe-price").innerText = ogPrice.innerText;
  modal.querySelector(".shoe-stock-quantity").innerText = product.quantity;
  product.availableColors.forEach((c) => {
    let span = document.createElement("span");
    let image = document.createElement("img");
    span.classList.add("shoe-color", `color-${colors}`);
    image.classList.add("shoe-image-choice", `shoe-image-choice-${colors}`);
    if (
      span.classList.contains("color-1") &&
      image.classList.contains("shoe-image-choice-1")
    ) {
      span.classList.add("current-shoe-color");
      image.classList.add("current-shoe-image");
    }
    colors++;
    span.style.backgroundColor = c;
    image.src = `/images/Products/colors/${c}.jpg`;
    colorContainer.appendChild(span);
    imageContainer.appendChild(image);
  });
  product.availableSizes.forEach((s) => {
    let span = document.createElement("span");
    span.classList.add("shoe-size", `size-${sizes}`);
    if (span.classList.contains("size-1")) {
      span.classList.add("current-shoe-size");
    }
    sizes++;
    span.innerText = s;
    sizeContainer.appendChild(span);
  });
  let colorsList = document.querySelectorAll(".shoe-color");
  colorsList.forEach((c) => {
    c.addEventListener("click", () => {
      colorsList.forEach((c) => {
        c.classList.remove("current-shoe-color");
      });
      c.classList.add("current-shoe-color");
    });
  });
  let sizesList = document.querySelectorAll(".shoe-size");
  sizesList.forEach((s) => {
    s.addEventListener("click", () => {
      sizesList.forEach((s) => {
        s.classList.remove("current-shoe-size");
      });
      s.classList.add("current-shoe-size");
    });
  });
  let imagesList = document.querySelectorAll(".shoe-image-choice");
  imagesList.forEach((i) => {
    i.addEventListener("click", () => {
      imagesList.forEach((i) => {
        i.classList.remove("current-shoe-image");
      });
      i.classList.add("current-shoe-image");
      modal.querySelector(".shoe-image").src = i.src;
    });
  });
  let modalWishBtn = modal.querySelector(".shoe-wishlist");
  let wishes = fetchWishFromLocal();
  wishes.forEach((w) => {
    if (w.id == product.id) {
      modalWishBtn.setAttribute("name", "heart");
    }
  });
  modalWishBtn.addEventListener(
    "click",
    (e) => {
      toastMsg(
        e.target,
        modal.querySelector(".shoe-image").src,
        modal.querySelector(".shoe-brand").innerText,
        modal.querySelector(".shoe-title").innerText
      );
      modalWishBtn.getAttribute("name") == "heart-outline"
        ? addWishToLocal(product, modalWishBtn, wishNo)
        : removeWishFromLocal(product, modalWishBtn, wishNo);
      modal.showModal();
    },
    { once: true }
  );
  let cartBtn = modal.querySelector(".shoe-add-to-cart-btn");
  cartBtn.addEventListener(
    "click",
    (e) => {
      let colors = modal.querySelector(".current-shoe-color");
      let colored = getComputedStyle(colors).backgroundColor;
      let sized = parseInt(modal.querySelector(".current-shoe-size").innerText);
      let priced = parseFloat(
        modal.querySelector(".discounted-shoe-price").innerText.replace("$", "")
      );
      let quantized = parseInt(modal.querySelector(".shoe-quantity").innerText);
      addCartToLocal(product, colored, sized, priced, quantized, cartNo);
      toastMsg(
        e.target,
        modal.querySelector(".shoe-image").src,
        modal.querySelector(".shoe-brand").innerText,
        modal.querySelector(".shoe-title").innerText
      );
      modal.showModal();
    },
    { once: true }
  );
  let closeModal = modal.querySelector(".close-modal");
  closeModal.addEventListener(
    "click",
    () => {
      modal.close();
    },
    { once: true }
  );
}
