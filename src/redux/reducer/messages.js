import { CREATE_MESSAGES } from "../actiontypes/alerttypes";

const initialState = {};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGES:
      return (state = action.payload);
    default:
      return state;
  }
}
