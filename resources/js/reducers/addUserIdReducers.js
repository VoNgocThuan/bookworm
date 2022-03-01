const initialState = {
    currentUserId: ''
}

export default function userIdReducers(state = initialState, action) {
    switch (action.type) {
        case 'ADD_USER_ID':
            return {
                ...state,
                currentUserId: action.payload
            };
        default:
            return state;
    }
}