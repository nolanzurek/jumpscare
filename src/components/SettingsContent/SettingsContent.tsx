import { useEffect } from "preact/hooks";
import { downloadData } from "../../functions/downloadData";

export function SettingsContent(props: { closeSettings: () => void }) {
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
      <p>Theme selection coming soon!</p>
      <button id="download-data-button" onClick={() => downloadData()}>
        Download data (JSON)
      </button>
      <button id="close-settings-button" onClick={() => props.closeSettings()}>
        Close Settings
      </button>
    </div>
  );
}
