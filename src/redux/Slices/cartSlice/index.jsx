import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    addresses: [],
    cartProductCount: 0,

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
        }
    }
})

export const { setCartItems, setCartProductCount, setAddresses } = cartSlice.actions

export default cartSlice.reducer
