import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import Tag from "../Tag/";
import { postTodo } from "../../store/actions";
import "./index.css";
import { RootState } from "../../store";

type StateProps = {
  fetching: boolean;
};

const mapStateToProps = (state: RootState): StateProps => ({
  fetching: state.todo.fetching.postTodo,
});

const mapDispatchToProps = {
  postTodo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function CreateTodo(props: Props): JSX.Element {
  const { fetching, postTodo } = props;

  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

  function submitTodo(): void {
    postTodo(content as string, tags);
  }

  function onChangeTags(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    if (value.includes(",")) {
      const withoutCommas = value.replace(/,/g, "");
      if (withoutCommas.length) {
        setTags([...tags, withoutCommas]);
      }
    }
  }

  function onChangeContent(event: React.ChangeEvent<HTMLInputElement>): void {
    setContent(event.target.value);
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
        <input type="text" name="content" value={content} onChange={onChangeContent} />
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
      <button onClick={submitTodo} disabled={fetching || !content}>
        {fetching ? "..." : "Submit"}
      </button>
    </div>
  );
}

export default connector(CreateTodo);
