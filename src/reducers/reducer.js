import { GET_ALL_LEASES, GET_MORE_INFO } from '../constants/actionTypes'

const initialState = {
    all_leases: [],
    lease_more_info: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LEASES:
            return {
                ...state,
                all_leases: action.payload,

            };

        case GET_MORE_INFO:
            return {
                ...state,
                lease_more_info: action.payload,

            };



    }
    return state;
}

