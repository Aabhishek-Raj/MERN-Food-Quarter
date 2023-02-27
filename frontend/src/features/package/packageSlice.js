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
                    total: item.price * 50, 
                    people: 50,
                    discountedPrice: 0
                };
            } else {
                const itemIndex = state[supplierId].items.findIndex(each => each._id === item._id);

                if (itemIndex === -1) {
                    state[supplierId].items.push({ ...item, itemquantity: 1 });
                    state[supplierId].total += item.price * state[supplierId].people
                    state[supplierId].quantity++;
                } else {
                    const currentItem = state[supplierId].items[itemIndex]
                    currentItem.itemquantity = currentItem.itemquantity + 1
                    state[supplierId].total += item.price * state[supplierId].people
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
            state[supplierId].total -= (item.price * item.itemquantity) * state[supplierId].people

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
                    state[supplierId].total -= item.price * state[supplierId].people
                }
            } else if (manage === 'INCREASE') {
                if (currentItem.itemquantity < 5) {
                    currentItem.itemquantity += 1
                    state[supplierId].total += item.price * state[supplierId].people
                }
            }

            localStorage.setItem('packages', JSON.stringify(state))
        },
        pricePerPerson: (state, action) => {
            const { personCount, id } = action.payload;
            // if(personCount > state[id].people){
            //     state[id].people = personCount
            // }
            const currentTotal = state[id].items.reduce((total, item) => {
                const itemTotal = item.price * item.itemquantity
                return (total + itemTotal)
            }, 0)
            if (personCount > state[id].people) {
                const newTotal = personCount * currentTotal;
                state[id].total = newTotal;
            } else {
                state[id].total = currentTotal
            }
        },
        invoiceChange: (state, action) => {
            const {discount, forPerson, ifPerson, supplierId} = action.payload
            console.log(discount, forPerson, ifPerson, supplierId) 
            if( state[supplierId].people > ifPerson) {

                state[supplierId].people = ifPerson
            }
            console.log(state[supplierId].people)
            const totalDiscount = (state[supplierId].people / forPerson) * discount
            const newTotal = state[supplierId].total - totalDiscount
            state[supplierId].total = newTotal
        }

    }
}
)

export const { addToPackage, deleteFromPackage, manageItemQuantity, pricePerPerson, invoiceChange } = packageSlice.actions

export default packageSlice.reducer