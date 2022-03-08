const initialState = {
    currentTotalCartQty: 0
}

export default function totalCartQtyReducers(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TOTAL_CART_QTY':
            return {
                ...state,
                currentTotalCartQty: action.payload
            };
        default:
            return state;
    }
}