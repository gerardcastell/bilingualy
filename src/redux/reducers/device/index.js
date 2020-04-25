import { SWITCH_OFFLINE, SWITCH_ONLINE } from "../../../constants";

const initialState = {
  online: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_ONLINE:
      return {
        ...state,
        online: true,
      };

    case SWITCH_OFFLINE:
      return {
        ...state,
        online: false,
      };
    default:
      return state;
  }
};
