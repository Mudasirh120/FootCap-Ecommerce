import { wishBtn } from "./main";
export function updateWishCount() {
  let wish = JSON.parse(localStorage.getItem("wishItem") || "[]");
  if (wish) {
    wishBtn.innerText = wish.length;
  } else {
    wishBtn.innerText = 0;
  }
}
