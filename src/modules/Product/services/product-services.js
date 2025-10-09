import { getproductData } from "../../../shared/services/product-api"

 export const getProducts = async () => {
    const response = await getproductData("https://backend-rssb.onrender.com/api/product");
    // console.log("data");
    // console.log(response);
    return response;
}