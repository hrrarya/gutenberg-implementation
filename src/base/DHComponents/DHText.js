import { Form } from "react-bootstrap";
import { useState } from "@wordpress/element";

const DHText = ({ name, type, placeholder = "" }) => {
  const [text, setText] = useState("");

  return (
    <>
      <Form.Label>{name}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={(value) => setText(value)}
      />
    </>
  );
};

export default DHText;
