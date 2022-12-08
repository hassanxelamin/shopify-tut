import React from 'react'
import { ProductPageContent } from '../../components/ProductPageContent'
import { getAllProducts, getProduct } from "../../lib/shopify"

export default function ProductPage({ product }) {

  return (
    <ProductPageContent product={product} />
  )
}

/*
* Gets Dynamic Handles
*/
export async function getStaticPaths() {
  const products = await getAllProducts();

  const paths = products.map(item => {
    const product = String(item.node.handle)

    return {
      params: { product }
    }
  })

  return{
    paths,
    fallback: false
  }
}

/*
* Gets Single Product using dynamic handles
*/
export async function getStaticProps({ params }) {
  const product = await getProduct(params.product)

  return {
    props: {
      product
    }
  }
}