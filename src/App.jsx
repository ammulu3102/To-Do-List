import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [taskText, setTaskText] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  function addTask() {
    if (taskText === "") return;

    const newTask = {
      text: taskText,
      completed: false,
    };

    setTaskList([...taskList, newTask]);
    setTaskText("");
  }

  function deleteTask(taskPosition) {
    const updatedList = taskList.filter(
      (taskItem, position) => position !== taskPosition,
    );
    setTaskList(updatedList);
  }

  function toggleTask(taskPosition) {
    const updatedList = taskList.map((taskItem, position) => {
      if (position === taskPosition) {
        return {
          ...taskItem,
          completed: !taskItem.completed,
        };
      }
      return taskItem;
    });
    setTaskList(updatedList);
  }

  return (
    <div className="screen">
      <div className="box">
        <h1>MY TASKS⭐</h1>

        <div className="inputRow">
          <input
            className="input"
            placeholder="Enter task..."
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
          />

          <button className="addBtn" onClick={addTask}>
            Add
          </button>
        </div>

        <ul className="list">
          {taskList.map((taskItem, taskPosition) => (
            <li key={taskPosition} className="listItem">
              <span
                className={taskItem.completed ? "circle filled" : "circle"}
                onClick={() => toggleTask(taskPosition)}
              ></span>

              <span
                className={taskItem.completed ? " taskText strike" : "taskText"}
              >
                {taskItem.text}
              </span>

              <button
                className="deleteBtn"
                onClick={() => deleteTask(taskPosition)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
