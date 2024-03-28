// import { configureStore } from "@reduxjs/toolkit";
// import memberReducer from "./reducers/memberReducer";
// import memberReducer from "./reducers/memberReducer";
// //import { getMembersMidd } from "./middleware/tripMiddleWare";

// export const store=configureStore({
//     reducer:{
//     member:memberReducer,
//     },
// middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware({serializableCheck:false}),getMembersMidd],
// })

// store.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import memberReducer from "./reducers/memberReducer";
import { getMembersMidd } from "./middleware/middleware";

export const store = configureStore({
  reducer: {
    member: memberReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(getMembersMidd),
});
