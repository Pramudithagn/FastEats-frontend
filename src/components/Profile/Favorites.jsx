import React from 'react'
import { RestaurantCard } from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

export const Favorites = () => {

  const {auth, restaurant} = useSelector(Store => Store)
  console.log(auth.favourites)
  console.log("restaurant in fav",restaurant)

  const favourites = restaurant.restaurants.filter((rest) => auth.favourites.some((item) => item.id === rest.id))
  console.log("restaurant filtered",favourites)

  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
     <div className='flex flex-wrap justify-center'>
      {favourites.map((item)=><RestaurantCard item={item}/>)}
    </div>
    </div>
  )
}
