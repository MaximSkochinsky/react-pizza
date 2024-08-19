import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const SearchContext = React.createContext("");

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  console.log(searchValue);

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              ></Route>
              <Route path="/cart"></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
