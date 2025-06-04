import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
function App() {
  return (
   <div>
    <Provider store={appStore}>

    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/login" element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
   </div>
  );
}

export default App;
