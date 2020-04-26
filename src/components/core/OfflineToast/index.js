import React, { useState, useEffect, useRef } from "react";
import { f7, f7ready } from "framework7-react";

import actions from "../../../redux/actions";
import { useDispatch } from "react-redux";

const OfflineToast = () => {
  let firstTimeRef = useRef(true);

  const dispatch = useDispatch();

  useEffect(() => {
    handleConnection();
    window.addEventListener("online", handleConnection);
    window.addEventListener("offline", handleConnection);
    return () => {
      window.removeEventListener("online", handleConnection);
      window.removeEventListener("offline", handleConnection);
    };
  }, []);

  // window.addEventListener("online", handleConnection);
  // window.addEventListener("offline", handleConnection);

  function renderToast(connection) {
    let options = {
      text: null,
      position: "bottom",
      closeTimeout: 4000,
      closeButton: true,
      closeButtonText: "Close Me",
      closeButtonColor: null,
    };
    console.log(connection);
    switch (connection) {
      case "online": {
        options.text = "You are online again!";
        options.closeButtonColor = "blue";
        break;
      }
      case "offline": {
        options.text = "You are offline right now";
        options.closeButtonColor = "red";
        break;
      }
      case "badConnectivity": {
        options.text = "You are online again!";
        options.closeButtonColor = "red";
        break;
      }

      default: {
        options.text = "Unexpected problem with toast";
        options.closeButtonColor = "red";
        break;
      }
    }
    if (f7ready && !firstTimeRef.current) {
      f7.toast.show(options);
    } else {
      firstTimeRef.current = false;
    }
  }

  function handleConnection() {
    if (navigator.onLine) {
      isReachable(getServerUrl()).then(function (online) {
        if (online) {
          dispatch(actions.deviceActions.switchOnline());
          renderToast("online");
        } else {
          dispatch(actions.deviceActions.switchOffline());
          renderToast("badConnectivity");
        }
      });
    } else {
      dispatch(actions.deviceActions.switchOffline());
      renderToast("offline");
    }
  }

  function isReachable(url) {
    /**
     * Note: fetch() still "succeeds" for 404s on subdirectories,
     * which is ok when only testing for domain reachability.
     *
     * Example:
     *   https://google.com/noexist does not throw
     *   https://noexist.com/noexist does throw
     */
    return fetch(url, { method: "HEAD", mode: "no-cors" })
      .then(function (resp) {
        return resp && (resp.ok || resp.type === "opaque");
      })
      .catch(function (err) {
        console.warn("[conn test failure]:", err);
      });
  }

  function getServerUrl() {
    return window.location.origin;
  }
  return <></>;
};

export default OfflineToast;
