import React from 'react'
import { getproductData } from '../../shared/services/product-api';
import Products from '../Product/Pages/Product';

const Home = () => {

  // const getProducts = async()=>{
  //     const response = await getproductData("http://localhost:1234/equipment");
  //     console.log(response);
  //     return response;
  // }

  return (
    <Products/>
  )
}

export default Home