import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/home/Layout";
import store from "./store/Store";
import MainPage from "./codeTactaclesTask/MainPage";

function AppContent() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="text-gray-600">
      {/* {isLoggedIn ? <Layout /> : <Login />} */}
      <MainPage />
      {/* <Layout /> */}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
