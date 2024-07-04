import React from 'react'
import { OrderCard } from './OrderCard'

export const Orders = () => {
  return (
    <div>
      <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
      {/* {order.orders.map((order) => order.items.map((item, i) => <OrderCard key={i} status={order.orderStatus} order={item} />))} */}
        {[1,1,1].map((item, i) => <OrderCard />)}
      </div>
    </div>
    </div>
  )
}
