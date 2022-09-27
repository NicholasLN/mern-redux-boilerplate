import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFocus } from "./redux/reducers/windowFocusSlice";

export default function WindowFocusHandler(props) {
  var isFocused = useSelector((state) => state.windowFocus.focus);
  var dispatch = useDispatch();

  var onFocus = () => {
    dispatch(setFocus(true));
  };
  var onBlur = () => {
    dispatch(setFocus(false));
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [isFocused]);

  return <>{props.children}</>;
}
