import { useState } from "preact/hooks";
import type { GlobalState } from "../../types/statefulTypes";
import { SettingsContent } from "../SettingsContent/SettingsContent";
import "./SideButton.css";

export function SideButton(props: {
  appData: GlobalState;
  setAppData: (data: GlobalState) => void;
}) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div id="add-pane-button-container">
      <button
        id="add-pane-button"
        onClick={() => {
          const newLists = { ...props.appData.listData };
          const newId =
            Math.max(0, ...Object.values(newLists).map((l) => Number(l.id))) +
            1;
          newLists[`My list ${newId}`] = { id: `${newId}`, items: [] };
          props.setAppData({ listData: newLists });
        }}
      >
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
          <SettingsContent closeSettings={() => setShowSettings(false)} />
        </dialog>
      }
    </div>
  );
}
