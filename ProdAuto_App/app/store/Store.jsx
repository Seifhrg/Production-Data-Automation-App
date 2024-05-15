import { applyMiddleware, combineReducers, createStore } from "redux";

import WorkOrdersReducers from "./Reducers/WorkOrdersReducers";
import { thunk } from "redux-thunk";
const rootReducer = combineReducers({
  workOrders: WorkOrdersReducers,
});

const Store = createStore(rootReducer, applyMiddleware(thunk));
export default Store;
