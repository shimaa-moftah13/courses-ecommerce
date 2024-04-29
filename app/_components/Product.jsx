"use client"

import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import ProductApis from '../_utils/ProductApis'
import {ArrowRight} from 'lucide-react'

function Product() {
 const [productList, setProductList] = useState([])

  useEffect(()=>{
    getLatestProducts_()
  }, [])
    const getLatestProducts_ =()=>{
        ProductApis.getLatestProducts().then(response => {
            console.log(response?.data?.data);
            setProductList(response?.data?.data)
        })
    }
  return (
    <div className='px-10 md:px-20'>
           <h2 className='my-4 text-xl'>Our Latest Products
           <span className='font-normal text-[14px]
         float-right text-primary flex 
         items-center cursor-pointer hover:text-teal-600'>
          View All Collection <ArrowRight className='h-4' /> </span>
           </h2>
        <ProductList productList = {productList}/>
        
    </div>
  )
}

export default Product