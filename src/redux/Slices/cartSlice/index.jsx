import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    addresses: [],
    cartProductCount: 0,
    coupon: null,

}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload
        },
        setCartProductCount: (state, action) => {
            state.cartProductCount = action.payload
        },
        setAddresses: (state, action) => {
            state.addresses = action.payload
        },
        setCoupon: (state, action) => {
            state.coupon = action.payload
        }
    }
})

export const { setCartItems, setCartProductCount, setAddresses, setCoupon } = cartSlice.actions

export default cartSlice.reducer
