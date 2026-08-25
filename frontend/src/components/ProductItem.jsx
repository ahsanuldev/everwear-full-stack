import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer block' to={`/product/${id}`}>
      <div className="overflow-hidden aspect-[3/4] w-full bg-gray-100">
        <img 
          className='w-full h-full object-cover hover:scale-105 transition duration-300 ease-in-out' 
          src={Array.isArray(image) ? image[0] : image} 
          alt={name} 
        />
      </div>
      <p className='pt-3 pb-1 text-sm truncate'>{name}</p>
      <p className='text-sm font-medium'>{currency} {price}</p>
    </Link>
  )
}

export default ProductItem
