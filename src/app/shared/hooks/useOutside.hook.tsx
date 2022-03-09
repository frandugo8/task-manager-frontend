import { useEffect } from "react";
interface useOutsideProps {
  ref: any,
  callback: Function
}

export function useOutside({ref, callback}: useOutsideProps) {
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback()
        }
      }

      document.addEventListener("mousedown", (e) => handleClickOutside(e))
      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      };
  }, [ref, callback])
}