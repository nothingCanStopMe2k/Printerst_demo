import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import pinReducer from "./pin/pinReducer";
import viewerReducer from "./viewer/viewerReducer";
import messageReducer from "./message/messageReducer";
import userReducer from "./user/userReducer";
// import thunk from 'redux-thunk';  Middleware viết các Action trả về một function thay vif plain js. xử lý các logic bất đồng bộ cần truy cập đến store

const rootReducers = combineReducers({
  pinReducer,
  viewerReducer,
  messageReducer,
  userReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers, composeEnhancers());
console.log("Store: ", store.getState());

export default store;
