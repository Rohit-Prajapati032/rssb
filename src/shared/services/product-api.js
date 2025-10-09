import axios from "axios";

const axiosObject = axios.create({
  timeout: 10000,
  // baseURL: import.meta.env.VITE_API_URL, // optional
});

// const url = "http://localhost:1234/api/product";
export const getproductData = async (url) => {
  try {
    const response = await axiosObject.get(url);
    // console.log('api-client', response);
    return response.data;
  } catch (error) {
    // console.error("Error fetching products:", error);
    throw error;
  }
};