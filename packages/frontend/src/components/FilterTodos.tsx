import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../store";
import { setFilterTag } from "../store/actions";

function FilterTodos({ tags, setFilterTag }: FilterTodosProps): JSX.Element {
  const [selectedTag, setSelectedTag] = useState("");

  function handleClick(tag: string): void {
    const tagToSet = selectedTag === tag ? "" : tag;
    setSelectedTag(tagToSet);
    setFilterTag(tagToSet);
  }

  return (
    <div>
      <h2>Pick a tag to filter todos with</h2>
      <select>
        {tags.map((tag) => (
          <option key={tag} onClick={(): void => handleClick(tag)}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}

type FilterTodosStateProps = {
  tags: string[];
};

const mapStateToProps = (state: RootState): FilterTodosStateProps => ({
  tags: Object.keys(state.todo.tags),
});

const mapDispatchToProps = {
  setFilterTag,
};

type FilterTodosProps = FilterTodosStateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FilterTodos);
