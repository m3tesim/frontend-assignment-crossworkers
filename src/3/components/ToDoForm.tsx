import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Todo } from "../types";

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FunctionComponent<TodoFormProps> = ({ addTodo }) => {
  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={Yup.object({
        text: Yup.string().max(100, "Max characters is 100"),
      })}
      onSubmit={(values, { resetForm }) => {
        addTodo({ id: Date.now(), text: values.text, completed: false });
        resetForm();
      }}
    >
      <Form>
        <Field name="text" type="text" placeholder="Add new todo" />
        <ErrorMessage name="text" component="div" />
        <button type="submit">Add Todo</button>
      </Form>
    </Formik>
  );
};

export default TodoForm;
