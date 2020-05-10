import React from "react";
import "./Tag.css";

type TagProps = { tag: string; deleteTag: () => void };

export default function Tag({ tag, deleteTag }: TagProps): JSX.Element {
  return (
    <div className="tag" onClick={deleteTag}>
      <span className="tagText">{tag}</span>
    </div>
  );
}
