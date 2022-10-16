import { GET_SUCCESS } from "../actiontypes/alerttypes";

const initialState = {
  msg: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS:
      return {
        msg: action.payload.msg,
      };
    default:
      return state;
  }
}
