import { useState, useEffect } from "react";

function useDateFormat(initialDate) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    let userLocale = navigator.language;

    const formatDate = (dateString, locale) => {
      const date = new Date(dateString);
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return new Intl.DateTimeFormat(locale, options).format(date);
    };

    userLocale = userLocale ? userLocale : "en-US";
    setFormattedDate(formatDate(initialDate, userLocale));
  }, [initialDate]);

  return formattedDate;
}

export default useDateFormat;
