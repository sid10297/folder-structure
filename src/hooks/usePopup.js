import { useEffect, useRef, useState } from "react";

const usePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        event.button === 0
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopup = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowPopup(!showPopup);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    togglePopup(e);
  };

  return { showPopup, popupRef, togglePopup, handleContextMenu, setShowPopup };
};

export default usePopup;
