export const cartTotalPrice = (items) => {
  return items.reduce((accumlator, item) => item.totalPrice + accumlator, 0);
};
