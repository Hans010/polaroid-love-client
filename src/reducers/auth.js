import {actionTypes} from '../constants/actionTypes';

const authReducer = (state={authData: null}, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            console.log(action?.data);
            return state;
        default:
            return state;
    }
}

export default authReducer;