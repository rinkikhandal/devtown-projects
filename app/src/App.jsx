import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Todo from "./components/todo";
import Login from "./components/login";
import Edit from "./components/editTodo"
import Logout from "./components/logout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<Todo />} />
          <Route path="/editTodo/:id" element={<Edit />} />
          <Route path="/logout" element={<Logout/>}/>
          <Route path="*" element={<h1>404 Not Found</h1>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
