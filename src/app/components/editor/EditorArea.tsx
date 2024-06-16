import React from "react";
import { MDXComponent } from "../mdx/MDXComponent";
import styles from "./editorarea.module.css"

export default function EditorArea({
  className,
  input,
  setInput,
}: {
  className?: string,
  input: string,
  setInput: Function,
}) {

  const handlerChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }

  return (
    <div className={`${className} ${styles["container"]}`}>
      <h3 className={styles["title"]}>Editor</h3>
      <textarea className={styles["textarea"]} value={input} onChange={handlerChange}/>
    </div>
    
  );
}
