// note: preact might need to be imported to fix the "can't find module" error when importing other components
// but now it works? odd
// import Preact from "preact";
import { useState } from "preact/hooks";

import { NewTask } from "../NewTask/NewTask";
import { ListItem } from "../ListItem/ListItem";
import "./ListPane.css";

export function ListPane(props: {
  list: { id: string; text: string }[];
  name: string;
  color: number;
  appendToList: (item: string) => void;
  changeListName: (newName: string) => void;
  removeFromList: (toDelete: { id: string; text: string }) => void;
  removePane: () => void;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <section
      className="list-pane"
      style={{ background: `hsl(${props.color % 360}, 50%, 50%)` }}
    >
      <div className="title-section">
        {editing ? (
          <input
            className="edit-list-title-input"
            type="text"
            placeholder="New Name"
            onKeyDown={(event) => {
              const input = event.target as HTMLInputElement;
              if (event.key === "Enter" && input.value != "") {
                props.changeListName(input.value);
                input.value = "";
                setEditing(false);
              }

              if (event.key === "Escape") {
                setEditing(false);
              }
            }}
          />
        ) : (
          <h2 className="title">{props.name}</h2>
        )}
        <button
          className="edit-list-title-button"
          onClick={() => {
            setEditing(true);
          }}
        >
          ✎
        </button>
      </div>

      <ul>
        {props.list.map((listEntry) => (
          <ListItem
            text={listEntry.text}
            removeItem={() => props.removeFromList(listEntry)}
          />
        ))}
      </ul>
      <NewTask appendToList={props.appendToList} />
      {props.list.length === 0 ? (
        <button
          className="remove-list-button"
          onClick={() => {
            props.removePane();
          }}
        >
          Remove List
        </button>
      ) : null}
    </section>
  );
}
