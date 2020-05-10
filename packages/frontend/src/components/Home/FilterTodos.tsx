import React from "react";
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
  function handleChange(tag: string): void {
    console.log(tag);
    setFilterTag(tag);
  }

  return (
    <div className="FilterTodos">
      <label>
        <span>Filter: </span>
        <select onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => handleChange(event.target.value)}>
          {["", ...tags].map((tag) => (
            <option key={tag}>{tag}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTodos);
