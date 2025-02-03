import { ChangeEvent, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "../App.css";

//Creating an interface which can be passed as props
const Todo: React.FC = () => {
  interface TodoList {
    item: string;
    complete: boolean;
    date: string;
  }

  //Creating a useState that takes in props and assigns them intial values
  const [addItem, setAddItem] = useState<TodoList>({
    item: "",
    complete: false,
    date: "",
  });

  //Creating an empty array in which the useState items above can be stored in, taking in the TodoList Props
  const [submitItem, setSubmitItem] = useState<TodoList[]>([]);

  // const [error, setError] = useState("");

  //Creating a handler that takes in the name and value of the items from the input field. Uses an event handling and HTMLinput handler for typescript
  const handleAddItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    //Taking the useState, spreading the information and adding the typed in results from the input field into the useState
    setAddItem({ ...addItem, [name]: value });
  };

  //Creating a submit button that handles the items typed into the input field
  const handleSubmitItem = () => {
    //Creating a variable that holds all of the data within an array that was submitted, plus all of the data that was entered from the useState
    const updateSubmit = [...submitItem, addItem];
    //Once submitted, it is addeded to an array. Set the useState to add to the array using all of the data entered and the current data being entered
    setSubmitItem([...submitItem, addItem]);
    //Clear the useState back to its original values (empty)
    setAddItem({ item: "", date: "", complete: false });
    //Once submitted, add the submitted items to the local storage using the variable created (it holds all the data and the array)
    localStorage.setItem("submitItem", JSON.stringify(updateSubmit));
  };

  //Creating a completed item handler that uses a "number" as an indicator to identify each item in the array. A 'number' is easy to assign because it is unquie to each item in the array

  const handleCompletedItem = (index: number) => {
    //Create a varaible the maps over all of the submitted items in the array, creating a basic variable and a key varaible to identify each item in the array
    const updatedItem = submitItem.map((todo, keyItem) =>
    // If the key identifer strickly equals the index (which is an assigned number), then we take all the data from the 'todo' item and toggle its boolean to true OR false.
    // !todo.completed is read as toggle between true or false. So, the boolean completed is read as "no the item added which is true or false is false" or "true"
    // Otherwise, leave the todo as is
      keyItem === index ? { ...todo, complete: !todo.complete } : todo
    );
    //Add the array or items to the  useState to update it
    setSubmitItem(updatedItem);
    // Add the updated items in the useState to relfect in local storage
    localStorage.setItem("submitItem", JSON.stringify(updatedItem));
  };

  // Create a delete handler, which similarily to the complete button, is assgined an id (number) to identify each once
  const handleDeleteItem = (index: number) => {
    // Create a varaible that defines an array with all of the submitted items
    const updateSubmit = [...submitItem];
    // We take the varaible with all of the items in the array and remove (splice) the number you clicked on, only remving one from the array
    updateSubmit.splice(index, 1);
    // Update the array with the new varaible and its changes to reflect in the useState
    setSubmitItem(updateSubmit);
    // Update the local storage to reflect the changes and delete items
    localStorage.setItem("submitItem", JSON.stringify(updateSubmit));
  };

  // Creating a useEffect to grab the items upon page load from the local storage
  useEffect(() => {
    const savedData = localStorage.getItem("submitItem");
    if (savedData) {
      setSubmitItem(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="container">
      <h1>Whats on the Agenda?</h1>
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
        {/* {error && <p className="error">{error}</p>} */}
      </div>
    </div>
  );
};

export default Todo;
