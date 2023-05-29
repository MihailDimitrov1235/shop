import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const mainContentElement = document.querySelector('.main-content');

    if(mainContentElement) {
        mainContentElement.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}