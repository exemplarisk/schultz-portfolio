/* import React, { useState } from "react";

function DarkModeButton() {
  const [darkMode, setDarkMode] = useState(false);

  const handleButtonClick = () => {
    setDarkMode(!darkMode);
    const body = document.querySelector("body");
    body?.classList.toggle("dark-mode");
  };

  return (
    <button
      className={`dark-mode-button ${darkMode ? "dark-mode-on" : ""}`}
      onClick={handleButtonClick}
    >
      <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}

export default DarkModeButton;
 */