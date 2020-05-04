import { Document, Schema, model } from "mongoose";

export type TodoResource = {
  todoId: string;
  content: string;
  created: Date;
  tags: string[];
};

interface TodoSchema extends Document, TodoResource {}

export const Todo = model<TodoSchema>(
  "Todo",
  new Schema<TodoSchema>({
    todoId: {
      unique: true,
      type: String,
    },
    content: String,
    created: Date,
    tags: [String],
  }),
);
