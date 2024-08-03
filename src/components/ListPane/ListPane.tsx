// note: preact must be imported to fix the "can't find module" error when importing other components
import Preact from "preact";

import { NewTask } from "../NewTask/NewTask";
import { ListItem } from "../ListItem/ListItem";
import "./ListPane.css";

export function ListPane(props: {
  list: { id: string; text: string }[];
  name: string;
  color: number;
  appendToList: (item: string) => void;
  removeFromList: (toDelete: { id: string; text: string }) => void;
  removePane: () => void;
}) {
  return (
    <section
      className="list-pane"
      style={{ background: `hsl(${props.color % 360}, 50%, 50%)` }}
    >
      <h2>{props.name}</h2>
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
