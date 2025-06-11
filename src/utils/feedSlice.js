import { createSlice } from "@reduxjs/toolkit";

    
const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
         addFeed : (state, action)=>{
            return action.payload;
        },
        removeFeed : (state, action)=> null,
        removeFeedUser:(state, action)=>{
            const newArr = state.filter((r)=>r._id != action.payload)
            return newArr 
        }
    }
})

export const {addFeed, removeFeed, removeFeedUser} = feedSlice.actions;
export default feedSlice.reducer;