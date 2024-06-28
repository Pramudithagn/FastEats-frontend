import React from 'react'
import "./Home.css"

export const Home = () => {
  return (
    <div>
        <section className='banner -z-50 relative flex flex-col justify-center items-center'>
            <div className='w-[50vw] z-10 text-center'>
                <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>Food</p>
                <p className='text-xl z-10 text-gray-300 lg:text-4xl'>HEy taste food heyyy</p>
            </div>
            <div className='cover absolute top-0 left-0 right-0'></div>
            <div className='fadeout'></div>
        </section>
    </div>
  )
}
