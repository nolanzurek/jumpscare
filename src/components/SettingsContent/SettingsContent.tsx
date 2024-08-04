export function SettingsContent(props: { closeSettings: () => void }) {
  return (
    <div id="settings-content">
      <h1>Settings</h1>
      <p>You just got flashbanged! L + Ratio</p>
      <button id="close-settings-button" onClick={() => props.closeSettings()}>
        Close
      </button>
    </div>
  );
}
