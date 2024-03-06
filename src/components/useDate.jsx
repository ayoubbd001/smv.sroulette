import { useEffect, useState } from "react";

function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-GB")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString("en-GB"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentDate;
}

export default useCurrentDate;
