// Function: add item, completed or not, Delete Items
// Add items into array
// Display items

// type in the todo...press to submit...display

import { ChangeEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const Todo: React.FC = () => {
  interface TodoList {
    item: string;
    complete: boolean;
    date: string;
  }

  const [addItem, setAddItem] = useState<TodoList>({
    item: "",
    complete: false,
    date: "",
  });

  const [submitItem, setSubmitItem] = useState<TodoList[]>([]);
  const [submitAgendaItem, setSubmitAgendaItem] = useState<TodoList[]>([]);

  const [error, setError] = useState("");

  const handleAddItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.trim() === "") {
      console.error("Item name cannot be empty");
      setError("Field Empty");
      return;
    }
    setAddItem({ ...addItem, [name]: value });
  };

  const handleSubmitItem = () => {
    setSubmitItem([...submitItem, addItem]);
    setAddItem({ item: "", date: "", complete: false });
  };

  const handleCompletedItem = (index: number) => {
    const updatedItem = submitItem.map((todo, keyItem) =>
      keyItem === index ? { ...todo, complete: !todo.complete } : todo
    );
    setSubmitItem(updatedItem);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">To Do</InputGroup.Text>
        <Form.Control
          placeholder="..add item"
          name="item"
          value={addItem.item}
          onChange={handleAddItemChange}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Date</InputGroup.Text>
        <Form.Control
          type="date"
          name="date"
          value={addItem.date}
          onChange={handleAddItemChange}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Button onClick={handleSubmitItem}>Add</Button>
      <div>
        <h5>List</h5>
        {submitItem.map((todo, index) => (
          <div key={index}>
            {todo.complete ? (
              <p style={{ textDecoration: "line-through" }}>
                {todo.item} - {todo.date}
              </p>
            ) : (
              <p>
                {todo.item} - {todo.date}
              </p>
            )}

            <Button onClick={() => handleCompletedItem(index)}>
              {todo.complete ? "Undo" : "Complete"}
            </Button>
          </div>
        ))}
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Todo;
