import { ChangeEvent, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "../App.css";

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

  const [error, setError] = useState("");

  const handleAddItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddItem({ ...addItem, [name]: value });
  };

  const handleSubmitItem = () => {
    const updateSubmit = [...submitItem, addItem];
    setSubmitItem([...submitItem, addItem]);
    setAddItem({ item: "", date: "", complete: false });
    localStorage.setItem("submitItem", JSON.stringify(updateSubmit));
  };

  const handleCompletedItem = (index: number) => {
    const updatedItem = submitItem.map((todo, keyItem) =>
      keyItem === index ? { ...todo, complete: !todo.complete } : todo
    );
    setSubmitItem(updatedItem);
    localStorage.setItem("submitItem", JSON.stringify(updatedItem));
  };

  const handleDeleteItem = (index: number) => {
    const updateSubmit = submitItem.filter((_, keyItem) => keyItem != index);
    setSubmitItem(updateSubmit);
    localStorage.setItem("submitItem", JSON.stringify(submitItem));
  };

  useEffect(() => {
    const savedData = localStorage.getItem("submitItem");
    if (savedData) {
      setSubmitItem(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="container">
      <h1>To Do List</h1>
      <InputGroup className="mb-3">
        {/* <InputGroup.Text id="basic-addon1">To Do</InputGroup.Text> */}
        <Form.Control
          placeholder="..add item"
          name="item"
          value={addItem.item}
          onChange={handleAddItemChange}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        {/* <InputGroup.Text id="basic-addon1">Date</InputGroup.Text> */}
        <Form.Control
          type="date"
          name="date"
          value={addItem.date}
          onChange={handleAddItemChange}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Button className="mb-3 addBtn" onClick={handleSubmitItem}>
        Add
      </Button>
      <div>
        {submitItem.map((todo, index) => (
          <div key={index} className="list-item">
            {todo.complete ? (
              <p style={{ textDecoration: "line-through" }}>
                {todo.item} {todo.date}
              </p>
            ) : (
              <p>
                {todo.item} {todo.date}
              </p>
            )}
            <Button
              className="completeBtn"
              onClick={() => handleCompletedItem(index)}
            >
              {todo.complete ? "Undo" : "Complete"}
            </Button>
            <Button
              className="completeBtn"
              onClick={() => handleDeleteItem(index)}
            >
              Delete
            </Button>
          </div>
        ))}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Todo;
