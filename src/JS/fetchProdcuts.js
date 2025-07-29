const fetchProducts = async () => {
  const data = {};
  try {
    const res = await fetch("../../products.json");
    data = await res.json();
  } catch (error) {
    console.log("Error fetching products.");
  }
  return data;
};
export default fetchProducts;
