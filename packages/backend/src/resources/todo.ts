import { Document, Schema, model } from "mongoose";

export type TodoResource = {
  todoId: string;
  content: string;
  created: number;
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
    created: {
      type: Number,
      min: new Date("2020").getTime(),
      max: new Date("2100").getTime(),
    },
    tags: [String],
  }),
);
