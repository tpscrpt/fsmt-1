import React, { useState } from "react";
import Tag from "../Tag/";
import "./index.css";

export default function CreateTodo(): JSX.Element {
  const [tags, setTags] = useState<string[]>([]);

  function submitTodo(): void {
    return;
  }

  function onChangeTags(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    if (value.includes(",")) {
      const withoutCommas = value.replace(/,/g, "");
      if (withoutCommas.length) {
        setTags([...tags, withoutCommas]);
        event.target.value = "";
      }
    }
  }

  function deleteTag(index: number): void {
    tags.splice(index, 1);
    setTags([...tags]);
  }

  return (
    <div className="CreateTodo">
      <label className="inputField">
        Content
        <br />
        <input type="text" name="content" />
      </label>
      <label className="inputField">
        Tags (separate with comma)
        <br />
        <input type="text" name="tags" onChange={onChangeTags} />
      </label>
      <div className="tags">
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag} deleteTag={(): void => deleteTag(index)} />
        ))}
      </div>
      <br />
      <button onClick={submitTodo}>Submit</button>
    </div>
  );
}
