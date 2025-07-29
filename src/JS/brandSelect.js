import showProductContainer from "./productContainer.js";
export default function brandSelect(
  brandSelect,
  popularProducts,
  Products,
  productCard,
  modal,
  wishNo,
  cartNo,
  type
) {
  brandSelect.forEach((brand) => {
    brand.addEventListener("click", (e) => {
      brandSelect.forEach((b) => {
        b.classList.remove("p-active");
      });
      e.target.classList.add("p-active");
      let activeBrand = e.target.innerText;
      showProductContainer(
        popularProducts,
        Products,
        productCard,
        modal,
        wishNo,
        cartNo,
        type,
        activeBrand
      );
    });
  });
}
