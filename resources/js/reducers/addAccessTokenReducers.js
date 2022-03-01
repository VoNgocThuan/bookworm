const initialState = {
    currentAccessToken: ''
}

export default function accessTokenReducers(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ACCESS_TOKEN':
            return {
                ...state,
                currentAccessToken: action.payload
            };
        default:
            return state;
    }
}