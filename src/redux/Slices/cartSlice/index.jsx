import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
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
        }
    }
})

export const { setCartItems, setCartProductCount } = cartSlice.actions

export default cartSlice.reducer
