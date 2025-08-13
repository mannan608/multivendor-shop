"use client";
import { useSelector } from "react-redux";


const Cart = () => {

  const guestCart = useSelector(state => state.cart?.items);

  console.log("guestCart", guestCart);
  return (
    <div>Cart</div>
  )
}

export default Cart