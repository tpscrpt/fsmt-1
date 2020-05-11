import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { setFilterTag } from "../../store/actions";

type StateProps = {
  tags: string[];
};

const mapStateToProps = (state: RootState): StateProps => ({
  tags: Object.keys(state.todo.tags),
});

const mapDispatchToProps = {
  setFilterTag,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function FilterTodos({ tags, setFilterTag }: Props): JSX.Element {
  const [selectedTag, setSelectedTag] = useState("");

  function handleClick(tag: string): void {
    const tagToSet = selectedTag === tag ? "" : tag;
    setSelectedTag(tagToSet);
    setFilterTag(tagToSet);
  }

  return (
    <div className="FilterTodos">
      <label>
        <span>Filter: </span>
        <select>
          {["", ...tags].map((tag) => (
            <option key={tag} onClick={(): void => handleClick(tag)}>
              {tag}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTodos);
