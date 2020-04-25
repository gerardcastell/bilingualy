import React, { useState, useEffect } from "react";
import { f7, f7ready } from "framework7-react";

import actions from "../../../redux/actions";
import { useDispatch } from "react-redux";

const OfflineToast = () => {
  //   const [isOnline, setIsOnline] = useState(false);

  //   useEffect(() => {
  //     window.addEventListener("online", handleConnectionChange);
  //     window.addEventListener("offline", handleConnectionChange);
  //     return () => {
  //       window.removeEventListener("online", handleConnectionChange);
  //       window.removeEventListener("offline", handleConnectionChange);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     console.log("IS ONLINE?", isOnline);
  //   }, [isOnline]);

  //   const handleConnectionChange = () => {
  //     const condition = navigator.onLine ? "online" : "offline";
  //     if (condition === "online") {
  //       const webPing = setInterval(() => {
  //         fetch("//google.com", {
  //           mode: "no-cors",
  //         })
  //           .then(() => {
  //             setIsOnline(true);
  //             clearInterval(webPing);
  //           })
  //           .catch(() => setIsOnline(false));
  //       }, 2000);
  //       return;
  //     }

  //     return setIsOnline(true);
  //   };

  // Test this by running the code snippet below and then
  // use the "Offline" checkbox in DevTools Network panel
  const dispatch = useDispatch();
  window.addEventListener("online", handleConnection);
  window.addEventListener("offline", handleConnection);

  function handleConnection() {
    if (navigator.onLine) {
      isReachable(getServerUrl()).then(function (online) {
        if (online) {
          // handle online status
          console.log("online");
          dispatch(actions.deviceActions.switchOnline());
          if (f7ready) {
            f7.toast.show({
              text: "You are online again!",
              position: "bottom",
              closeTimeout: 4000,
              closeButton: true,
              closeButtonText: "Close Me",
              closeButtonColor: "blue",
            });
          }
        } else {
          console.log("no connectivity");
          dispatch(actions.deviceActions.switchOffline());
          if (f7ready) {
            f7.toast.show({
              text: "It seems like you have connectivity problems.",
              position: "bottom",
              closeTimeout: 4000,
              closeButton: true,
              closeButtonText: "Close Me",
              closeButtonColor: "red",
            });
          }
        }
      });
    } else {
      // handle offline status
      console.log("offline");
      dispatch(actions.deviceActions.switchOffline());
      if (f7ready) {
        f7.toast.show({
          text: " You are offline right now",
          position: "bottom",
          closeTimeout: 4000,
          closeButton: true,
          closeButtonText: "Close Me",
          closeButtonColor: "red",
        });
      }
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
  return <div></div>;
};

export default OfflineToast;
