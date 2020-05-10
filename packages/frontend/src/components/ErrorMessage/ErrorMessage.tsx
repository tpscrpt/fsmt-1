import React from "react";
import "./ErrorMessage.css";
type Props = {
  error: string;
};

export default function ErrorMessage(props: Props): JSX.Element | null {
  const { error } = props;
  return error ? (
    <div className="errorMessage">
      <span>An error occurred: {error}</span>
    </div>
  ) : null;
}
