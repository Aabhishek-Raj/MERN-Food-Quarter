import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToPackage: (state, action) => {
            const { supplierId, item } = action.payload

            if (!state[supplierId]) {
                state[supplierId] = {
                    items: [item],
                    total: item.price,
                    quantity: 1,
                };
            } else {
                const itemIndex = state[supplierId].items.findIndex(i => i._id === item._id);
                console.log(itemIndex)

                if (itemIndex === -1 ) {
                    state[supplierId].items.push(item);
                    state[supplierId].total += item.price;
                    state[supplierId].quantity++;
                } else {
                    const currentItem = state[supplierId].items[itemIndex]
                    currentItem.itemquantity = currentItem.itemquantity ? currentItem.itemquantity + 1: 1
                    state[supplierId].total += item.price;
                    // state[supplierId].quantity++
                }
            }
        }   
    }
})

export const { addToPackage } = orderSlice.actions

export default orderSlice.reducer