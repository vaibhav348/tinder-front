import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestRequcer from "./requestSlice"
const appStore = configureStore({
  reducer: {
    user : userReducer,
    feed :feedReducer,
    connection : connectionReducer ,
    requests : requestRequcer

  },
})

export default appStore