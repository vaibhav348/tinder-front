import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import Connection from "./Components/Connection";
import Requests from "./Components/Requests";
function App() {
  return (
   <div>
    <Provider store={appStore}>

    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/" element={<Feed/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/connection" element={<Connection/>}/>
      <Route path="/requests" element={<Requests/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
   </div>
  );
}

export default App;
