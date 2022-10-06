import { useEffect, useRef, useState } from "react";

const useDebounce = ({ value, delay }) => {
  const [debounceVal, setDebounceVal] = useState(value);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [value, delay]);

  return debounceVal;
};

export default useDebounce;
