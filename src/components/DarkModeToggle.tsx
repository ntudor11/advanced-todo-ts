import React from "react";
import Switch from "react-switch";
import useDarkMode from "use-dark-mode";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div className="dark-mode-toggle">
      <button type="button" onClick={darkMode.disable}>
        ☀
      </button>
      <Switch
        checked={darkMode.value}
        onChange={darkMode.toggle}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
      />
      <button type="button" onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  );
};

export default DarkModeToggle;
