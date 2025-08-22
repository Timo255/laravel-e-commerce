import React from 'react'
import ProductDiv from './ProductDiv'
import useAuth from '../hooks/useAuth'


const Shop = () => {
  const {isLoading} = useAuth();
  return (
    <div>
      <ProductDiv />
    </div>
  )
}

export default Shop