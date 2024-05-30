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

export const selectWorkOrder = (workOrder) => ({
  type: "SELECT_WORK_ORDER",
  payload: workOrder,
});

//token passed from the agent screen getted from the useAuthStore function
export const fetchWorkOrders = (token) => async (dispatch) => {
  dispatch(fetchWorkOrdersRequest());
  console.log(token);

  try {
    const response = await axios.get(`http://${API_URL}/work-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const workOrders = response.data;
    dispatch(fetchWorkOrdersSuccess(workOrders));
  } catch (error) {
    console.error("Error fetching work orders:", error);
    dispatch(fetchWorkOrdersFailure(error.message));
  }
};
