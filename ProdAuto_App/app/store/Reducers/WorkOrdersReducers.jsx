const initialState = {
  workOrders: [],
  loading: false,
  error: null,
  /////
  selectedWorkOrder: null,
  ////////
};

export default function workOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_WORK_ORDERS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_WORK_ORDERS_SUCCESS":
      return { ...state, loading: false, workOrders: action.payload };
    case "FETCH_WORK_ORDERS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    //////////
    case "SELECT_WORK_ORDER":
      return { ...state, selectedWorkOrder: action.payload };
    ///////////////
    default:
      return state;
  }
}
