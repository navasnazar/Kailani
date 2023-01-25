import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE = {
    loginUserDetails: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState : INITIAL_STATE,
    reducers: {
        getUserLoginDetails:(state, action)=>{
            const loginUserDetails = action.payload;
            return {...state,loginUserDetails}
        }
    }
})

export const {
    getUserLoginDetails,
} = userSlice.actions

export default userSlice.reducer;