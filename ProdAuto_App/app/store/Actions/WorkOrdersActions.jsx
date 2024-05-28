import axios from "axios";
import { API_URL } from "@env";

// Action Types
const FETCH_WORK_ORDERS_SUCCESS = "FETCH_WORK_ORDERS_SUCCESS";
const FETCH_WORK_ORDERS_REQUEST = "FETCH_WORK_ORDERS_REQUEST";
const FETCH_WORK_ORDERS_FAILURE = "FETCH_WORK_ORDERS_FAILURE";

// Action Creators
export const fetchWorkOrdersSuccess = (workOrders) => ({
  type: FETCH_WORK_ORDERS_SUCCESS,
  payload: workOrders,
});

export const fetchWorkOrdersRequest = () => ({
  type: FETCH_WORK_ORDERS_REQUEST,
});

export const fetchWorkOrdersFailure = (error) => ({
  type: FETCH_WORK_ORDERS_FAILURE,
  payload: error,
});
////////////////////////////////////////////////////
export const selectWorkOrder = (workOrder) => {
  return {
    type: "SELECT_WORK_ORDER",
    payload: workOrder,
  };
};
////////////////////////////////////////////////////

export const fetchWorkOrders = () => async (dispatch) => {
  dispatch(fetchWorkOrdersRequest());

  try {
    const response = await axios.get(`http://${API_URL}/work-orders`);
    const workOrders = response.data;
    dispatch(fetchWorkOrdersSuccess(workOrders));
    console.log("triggred");
  } catch (error) {
    console.error("Error fetching work orders:", error);
    dispatch(fetchWorkOrdersFailure(error.message));
  }
};
