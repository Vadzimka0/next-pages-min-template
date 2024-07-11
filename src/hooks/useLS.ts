import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, any] {
  const isMounted = useRef(false);
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const item = JSON.parse(window.localStorage.getItem(key) || "");

      if (item) {
        switch (key) {
          case "last-date":
            setValue(item > defaultValue ? item : defaultValue);
            break;
          default:
            setValue(item);
            break;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      isMounted.current = false;
    };
  }, [key]);

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      isMounted.current = true;
    }
  }, [key, value]);

  return [value, setValue];
}
