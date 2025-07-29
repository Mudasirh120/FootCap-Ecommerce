const fetchProducts = async () => {
  try {
    const res = await fetch("../../products.json");
    const data = await res.json();
    console.log("data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export default fetchProducts;
