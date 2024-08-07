import Markdown from "preact-markdown";
// import { useEffect } from "preact/hooks";
import "./ListItem.css";

export function ListItem(props: { text: string; removeItem: () => void }) {
  // // if the list changes, rerender the mathjax
  // useEffect(() => {
  //   try {
  //     MathJax.typeset();
  //     return () => MathJax.typesetClear();
  //   } catch (e) {
  //     // womp womp
  //   }
  // }, [props.text]);

  return (
    <li className="list-item">
      <button className="close-button" onClick={props.removeItem}>
        ✕
      </button>
      <span>{Markdown(props.text, { markupOpts: {}, markedOpts: {} })}</span>
    </li>
  );
}
