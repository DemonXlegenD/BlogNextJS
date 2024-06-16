"use client";

import React, { useState } from "react";
import styles from "./editor.module.css";
import EditorArea from "../components/editor/EditorArea";
import DisplayEditor from "../components/editor/display/DisplayEditor";

export default function Editor() {
  const [code, setCode] = useState<string>("");

  return (
    <main className={styles["container"]}>
      <EditorArea
        className={`${styles["item"]}`}
        input={code}
        setInput={setCode}
      />
      <DisplayEditor className={`${styles["item"]}`} codeToShow={code}/>
    </main>
  );
}
