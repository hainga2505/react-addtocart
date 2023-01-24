const reducer = (state, action) => {
  if (action.type === "CLEAR") {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === "INC") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === "DEC") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cart) => cart.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === "GET_TOTAL") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const totalItem = price * amount;
        cartTotal.total += totalItem;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "DISPLAY") {
    return {
      ...state,
      loading: false,
      cart: action.payload,
    };
  }
  return state;
};
export default reducer;
