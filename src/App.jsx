import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";

function App() {
  return (
   <div>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/login" element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
