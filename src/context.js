import React, { useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };
  const increase = (id) => {
    dispatch({ type: "INC", payload: id });
  };
  const decrease = (id) => {
    dispatch({ type: "DEC", payload: id });
  };
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: "DISPLAY", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        increase,
        decrease,
        remove,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
