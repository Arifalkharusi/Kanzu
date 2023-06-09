import React, { useEffect } from "react";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import Search from "./components/Search/Search";
import Items from "./components/Items/Items";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage";
import SizeChart from "./components/SizeChart/SizeChart";
import FindSize from "./components/FindSize/FindSize";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import User from "./components/User/User";

import { login } from "./store/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <div className="App">
      <Menu />
      <Cart />
      <Search />
      <SizeChart />
      <FindSize />

      <Header />
      <div className="header-margin"></div>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/items/:cat" element={<Items />} />
        <Route path="/items/product/:itemid" element={<ProductPage />} />
        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/user" element={<User />} />
        <Route path="/account/create-account" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
