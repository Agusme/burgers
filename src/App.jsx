/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/views/Home/Home";
import ProductsTable from "./components/views/productsTable/ProductsTable";
import Error404 from "./components/views/error404/Error404";
import ProductCreate from "./components/views/productCreate/ProductCreate";
import ProductEdit from "./components/views/productEdit/ProductEdit";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import axios from "./config/axiosInit";
import ProductDetails from "./components/views/productDetail/ProductDetails";
function App() {
  const [products, setProduct] = useState([]);

  //usamos la variable entorno
  const URL = import.meta.env.VITE_API_HAMBURGUESERIA;

  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    try {
      /*     const res = await fetch(URL)
    const productApi =await res.json();
    setProduct(productApi) */
      const res = await axios.get(URL);
      setProduct(res.data);
    } catch (error) {
      console.log("error en el server");
    }
  };
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route exact path="/" element={<Home products={products} />} />
          <Route
            exact
            path="/product/table"
            element={<ProductsTable products={products}  getAPI={getAPI} />}
          />
          <Route
            exact
            path="/product/create"
            element={<ProductCreate getAPI={getAPI} />}
          />
          <Route exact path="/product/edit/:id" element={<ProductEdit  getAPI={getAPI}/>} />
          <Route exact path="/product/buy/:id" element={<ProductDetails getAPI={getAPI} /> } />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
