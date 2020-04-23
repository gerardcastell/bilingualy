import { useState, useEffect, useRef } from "react";

import useWindowDimensions from "./UseWindowDimensions";

export default function useMobileKeyboard() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const initialHeight = useRef();
  const { height, width } = useWindowDimensions();

  //Set initial viewport height to handle mobile keyboard
  useEffect(() => {
    initialHeight.current = height;
    console.log(height);
  }, []);

  //If mobile and viewport height changes set keyboard to open
  useEffect(() => {
    console.log(
      "TECLADO ABIERTO: ",
      width < 450 && height < 0.8 * initialHeight.current
    );
    setKeyboardOpen(width < 450 && height < 0.8 * initialHeight.current);
  }, [height]);

  return keyboardOpen;
}
