import Products from "../../products.json";
import showPopularProducts from "./productsPrinting";
import showModalContent from "./modal";
import { updateWishCount, updateCartCount } from "./updateCount";
const navBar = document.querySelector(".main-nav");
navBar.classList.add("sticky-nav");
export let wishBtn = document.querySelector(".wish-no");
export let cartBtn = document.querySelector(".cart-no");
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
        if (modal.showModal()) {
          document.body.addEventListener("click", () => {
            modal.close();
          });
        }
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
updateWishCount();
updateCartCount();
showProductContainer(Products);
