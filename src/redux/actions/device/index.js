import { SWITCH_ONLINE, SWITCH_OFFLINE } from "../../../constants";
import { f7 } from "framework7-react";

const switchOnline = () => {
  return {
    type: SWITCH_ONLINE,
  };
};

const switchOffline = () => {
  return {
    type: SWITCH_OFFLINE,
  };
};

export default {
  switchOnline,
  switchOffline,
};
