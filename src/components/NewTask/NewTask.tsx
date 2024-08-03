import "./NewTask.css";

export function NewTask(props: { appendToList: (item: string) => void }) {
  return (
    <input
      type="text"
      placeholder="New Item"
      onKeyDown={(event) => {
        const input = event.target as HTMLInputElement;
        if (event.key === "Enter" && input.value != "") {
          props.appendToList(input.value);
          input.value = "";
        }
      }}
    />
  );
}
