import {
  showPopularProducts,
  showSpecialProducts,
  showWishesProducts,
  showCartProducts,
} from "./productsPrinting.js";
import showModalContent from "./modal.js";
export default function showProductContainer(
  productsContainer,
  Products,
  productCard,
  modal,
  wishNo,
  cartNo,
  type,
  activeBrand
) {
  if (!Products) {
    return;
  }
  productsContainer.replaceChildren("");
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
    productClone
      .querySelector(".product-card")
      .setAttribute("id", `${id}-product`);
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
        showModalContent(modal, product, e.target, wishNo, cartNo);
      });
    if (type === "popular") {
      showPopularProducts(productsContainer, productClone, activeBrand);
    } else if (type === "special") {
      showSpecialProducts(productsContainer, productClone);
    } else if (type === "wishlist") {
      showWishesProducts(productsContainer, productClone, activeBrand);
    } else if (type === "cart") {
      showCartProducts(productsContainer, productClone, activeBrand);
    }
  });
}
