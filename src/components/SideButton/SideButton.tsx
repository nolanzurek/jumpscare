import { useState } from "preact/hooks";
import { SettingsContent } from "../SettingsContent/SettingsContent";
import "./SideButton.css";
import type { Theme } from "../../types/statefulTypes";

export function SideButton(props: {
  addPane: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div id="add-pane-button-container">
      <button id="add-pane-button" onClick={() => props.addPane()}>
        +
      </button>
      <button
        id="settings-button"
        onClick={() => setShowSettings(!showSettings)}
      >
        ⚙
      </button>
      {
        <dialog id="settings-dialog" open={showSettings}>
          <SettingsContent
            closeSettings={() => setShowSettings(false)}
            theme={props.theme}
            setTheme={props.setTheme}
          />
        </dialog>
      }
    </div>
  );
}
