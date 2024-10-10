export function isFromSameRestaurant(cartItems) {
  const restaurantId = cartItems[0]?.food?.restaurant.id;

  for (let item of cartItems) {
    if (item.food?.restaurant.id !== restaurantId) {
      return false;
    }
  }
  return true;
}
