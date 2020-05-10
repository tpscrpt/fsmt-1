import React from "react";
import "./index.css";

type TagProps = { tag: string; deleteTag: () => void };

export default function Tag({ tag, deleteTag }: TagProps): JSX.Element {
  return (
    <div className="tag">
      <span className="tagText">{tag}</span>
      <span className="deleteTagX" onClick={deleteTag}>
        &times;
      </span>
    </div>
  );
}
