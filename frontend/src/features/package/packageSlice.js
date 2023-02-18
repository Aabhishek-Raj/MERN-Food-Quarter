import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const packages = JSON.parse(localStorage.getItem('packages')) || {}

const initialState = packages

const packageSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        addToPackage: (state, action) => {
            const { supplierId, item } = action.payload

            if (!state[supplierId]) {
                state[supplierId] = {
                    items: [{ ...item, itemquantity: 1 }],
                    total: item.price,
                    quantity: 1,
                };
            } else {
                const itemIndex = state[supplierId].items.findIndex(each => each._id === item._id);

                if (itemIndex === -1) {
                    state[supplierId].items.push({ ...item, itemquantity: 1 });
                    state[supplierId].total += item.price;
                    state[supplierId].quantity++;
                } else {
                    const currentItem = state[supplierId].items[itemIndex]
                    currentItem.itemquantity = currentItem.itemquantity + 1
                    state[supplierId].total += item.price;
                    // state[supplierId].quantity++
                }
            }

            localStorage.setItem('packages', JSON.stringify(state))
        },
        deleteFromPackage: (state, action) => {
            const { supplierId, item } = action.payload
            console.log(item)

            const deleted = state[supplierId].items.filter(each => (
                each._id !== item._id
            ))
            state[supplierId].items = deleted
            state[supplierId].total -= item.price * item.itemquantity

            localStorage.setItem('packages', JSON.stringify(state))

            toast.error(`${item.name} removed from package`, {
                position: "bottom-left"
            })
        },
        manageItemQuantity: (state, action) => {
            const { supplierId, item, manage } = action.payload

            const itemIndex = state[supplierId].items.findIndex(each => each._id === item._id)

            const currentItem = state[supplierId].items[itemIndex]

            if (manage === 'DECREASE') {

                if (currentItem.itemquantity > 1) {
                    currentItem.itemquantity -= 1
                    state[supplierId].total -= item.price;
                }
            } else if (manage === 'INCREASE') {
                if (currentItem.itemquantity < 5) {
                    currentItem.itemquantity += 1
                    state[supplierId].total += item.price;
                }
            }

            localStorage.setItem('packages', JSON.stringify(state))
        },
        pricePerPerson: (state, action) => {
            const { personCount, id } = action.payload;
            const currentTotal = state[id].items.reduce((total, item) => {
                const itemTotal = item.price * item.itemquantity
                return total + itemTotal
            }, 0)
            if (personCount > 1) {
                const newTotal = personCount * currentTotal;
                state[id].total = newTotal;
            } else {
                state[id].total = currentTotal
            }
    }
}}
)

export const { addToPackage, deleteFromPackage, manageItemQuantity, pricePerPerson } = packageSlice.actions

export default packageSlice.reducer