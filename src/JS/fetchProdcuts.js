let data = [];
const fetchProducts = async () => {
  try {
    const res = await fetch("../../products.json");
    console.log("raw", res);
    data = await res.json();
    console.log("data", data);
  } catch (error) {
    console.log("Error fetching products.", error);
  }
  return data;
};
export default fetchProducts;
