import Products from "../../products.json";
import showPopularProducts from "./productsPrinting";
const navBar = document.querySelector(".main-nav");
navBar.classList.add("sticky-nav");
let popularProducts = document.querySelector(".popular-products");
let specialProducts = document.querySelector(".special-cards");
let productCard = document.querySelector(".card");
let popularSelect = document.querySelectorAll(".p-select");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector(".close-modal");
closeModal.addEventListener("click", () => {
  modal.close();
});
function popularBrandSelect() {
  popularSelect.forEach((brand) => {
    brand.addEventListener("click", (e) => {
      popularSelect.forEach((b) => {
        b.classList.remove("p-active");
      });
      e.target.classList.add("p-active");
      showProductContainer(Products);
    });
  });
}
popularBrandSelect();
function showProductContainer(Products) {
  if (!Products) {
    return;
  }
  popularProducts.replaceChildren("");
  Products.forEach((product) => {
    let {
      id,
      name,
      brand,
      category,
      originalPrice,
      discountPercentage,
      image,
      availableColors,
      availableSizes,
      gender,
      tag,
      quantity,
      totalSales,
      totalBought,
      totalManufactured,
    } = product;
    const productClone = document.importNode(productCard.content, true);
    productClone.querySelector(".product-card").setAttribute("id", `${id}`);
    productClone.querySelector(".product-image").src = image;
    productClone.querySelector(".product-tag").textContent = tag[0];
    productClone.querySelector(".product-gender").textContent = gender;
    productClone.querySelector(".slider").style.width = `${
      (totalSales / totalBought) * 100
    }%`;
    productClone.querySelector(
      ".quantity-text"
    ).textContent = `${quantity} left`;
    productClone.querySelector(".brand-logo").src = brand[0];
    productClone.querySelector(".brand-logo").alt = brand[1];
    productClone.querySelector(".product-title").textContent = name;
    if (discountPercentage === 0) {
      productClone.querySelector(".original-price").textContent = "";
      productClone.querySelector(
        ".product-price"
      ).textContent = `$${originalPrice}`;
    } else {
      productClone.querySelector(
        ".original-price"
      ).textContent = `$${originalPrice}`;
      productClone.querySelector(".product-price").textContent = `$${(
        originalPrice -
        (originalPrice * discountPercentage) / 100
      ).toFixed(2)}`;
    }
    productClone
      .querySelector(".product-view")
      .addEventListener("click", (e) => {
        modal.showModal();
        showModalContent(modal, product, e.target);
      });
    let activeBrand = document.querySelector(".p-active").textContent;
    showPopularProducts(
      popularProducts,
      specialProducts,
      productClone,
      activeBrand
    );
  });
}
showProductContainer(Products);
function showModalContent(modal, product, button) {
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
  let modalWishBtn = document.querySelector(".shoe-wishlist");
  modalWishBtn.addEventListener("click", () => {
    modalWishBtn.getAttribute("name") == "heart-outline"
      ? modalWishBtn.setAttribute("name", "heart")
      : modalWishBtn.setAttribute("name", "heart-outline");
  });
  let cartBtn = document.querySelector(".shoe-add-to-cart-btn");
  cartBtn.addEventListener("click", () => {
    let colored = document.querySelector(".current-shoe-color");
    localStorage.setItem(
      "cartProductLS",
      JSON.stringify({
        id: product.id,
        color: getComputedStyle(colored).backgroundColor,
        size: document.querySelector(".current-shoe-size").innerText,
        quantity: document.querySelector(".shoe-quantity").innerText,
        price:
          document.querySelector(".discounted-shoe-price").innerText.slice(1) *
          document.querySelector(".shoe-quantity").innerText,
      })
    );
  });
}
