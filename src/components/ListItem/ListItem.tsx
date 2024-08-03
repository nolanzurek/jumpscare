import "./ListItem.css";

export function ListItem(props: { text: string; removeItem: () => void }) {
  return (
    <li className="list-item">
      <button className="close-button" onClick={props.removeItem}>
        ✕
      </button>
      <span>{props.text}</span>
    </li>
  );
}
