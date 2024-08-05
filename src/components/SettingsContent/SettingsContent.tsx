import { useEffect } from "preact/hooks";
import { downloadData } from "../../functions/downloadData";
import { themes } from "../../data/themes";
import type { Theme } from "../../types/statefulTypes";
import "./SettingsContent.css";

export function SettingsContent(props: {
  closeSettings: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      console.log("close settings");
      props.closeSettings();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div id="settings-content">
      <h1>Settings</h1>
      <button id="download-data-button" onClick={() => downloadData()}>
        Download data (JSON)
      </button>
      <div id="theme-selector-container">
        {Object.keys(themes).map((theme: Theme) => (
          <label>
            <input
              type="radio"
              name="theme"
              value={theme}
              checked={props.theme === theme}
              onChange={() => props.setTheme(theme)}
            />{" "}
            {theme}
          </label>
        ))}
      </div>
      <button id="close-settings-button" onClick={() => props.closeSettings()}>
        Close Settings
      </button>
    </div>
  );
}
