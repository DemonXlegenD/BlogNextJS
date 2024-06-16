import React from "react";
import Markdown from 'react-markdown'
import styles from "./displayeditor.module.css"
import { CodeComponent } from "../../CodeComponent/Code";

export default function DisplayEditor({
  className,
  codeToShow,
}: {
  className?: string;
  codeToShow: string;
}) {


  return (
    <div className={`${className} ${styles["container"]}`}>
      <h3 className={styles["title"]}>Preview</h3>
      <Markdown className={styles["preview"]} components={{
        code: CodeComponent as any,
      }}>{codeToShow}</Markdown>
    </div>
    
  );
}
