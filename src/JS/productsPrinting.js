let specialNumber = 0;
export default function showPopularProducts(
  popularProducts,
  specialProducts,
  productClone,
  activeBrand
) {
  if (productClone.querySelector(".product-tag").textContent === "Popular") {
    let brand = productClone.querySelector(".brand-logo").alt;
    if (activeBrand === "All") {
      popularProducts.append(productClone);
    }
    if (activeBrand === brand) {
      popularProducts.append(productClone);
    }
  } else if (
    productClone.querySelector(".product-tag").textContent === "Special" &&
    specialNumber < 3
  ) {
    specialProducts.append(productClone);
    specialNumber++;
  }
}
export function showWishesProducts(
  wishes,
  wishesProduct,
  productClone,
  activeBrand
) {
  wishes.forEach((w) => {
    if (
      w.id === productClone.querySelector(".product-card").getAttribute("id")
    ) {
      wishesProduct.append(productClone);
    }
  });
}
