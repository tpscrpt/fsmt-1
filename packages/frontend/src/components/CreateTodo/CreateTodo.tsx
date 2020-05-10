import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { postTodo } from "../../store/actions";
import Tag from "./Tag/Tag";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./index.css";

type StateProps = {
  fetching: boolean;
  error: string;
};

const mapStateToProps = (state: RootState): StateProps => ({
  fetching: state.todo.fetching.postTodo,
  error: state.todo.errors.postTodo,
});

const mapDispatchToProps = {
  postTodo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function CreateTodo(props: Props): JSX.Element {
  const { fetching, postTodo, error } = props;

  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [wasFetching, setWasFetching] = useState<boolean>(false);

  if (fetching && !wasFetching) {
    setWasFetching(true);
  } else if (!fetching && wasFetching) {
    if (!error) {
      setContent("");
      setTags([]);
    }
    setWasFetching(false);
  }

  function submitTodo(): void {
    postTodo(content as string, tags);
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

  function onChangeContent(event: React.ChangeEvent<HTMLInputElement>): void {
    setContent(event.target.value);
  }

  function deleteTag(index: number): void {
    tags.splice(index, 1);
    setTags([...tags]);
  }

  return (
    <div className="CreateTodo">
      {ErrorMessage({ error })}
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
