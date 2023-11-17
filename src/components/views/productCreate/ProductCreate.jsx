/* eslint-disable react/prop-types */
import { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import {
  validateCategory,
  validatePrice,
  validateProductName,
  validateUrl,
} from "../../../helpers/validateFields";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axiosInit";

const ProductCreate = ({ getAPI }) => {
  //states
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [urlImg, setUrlImg] = useState();
  const [category, setCategory] = useState();
  const URL = import.meta.env.VITE_API_HAMBURGUESERIA;
  const navigate = useNavigate();
const [errorMessage, setErrorMessaage] = useState(null)
const [show, setShow] = useState(false)
  //estado general 
/* const [inputs, setInputs] = useState([])
const handleChange =(e)=>{
  const value =e.target.value; //aca al valor
  const name = e.target.name; //ahi accedo al name de cada nombre del formulario
  const {name, value} = e.target es lo mismo que hacer por separado
  setInputs((prevValues)=> ({...prevValues,  [name]: value })) // ese [name] seria el nombre de la variable del objeto que entre [] puedo poner el nombre , sino pongo los [] no me lo lee como variable
//para que no se sobreescriban tengo que copiar el array y q se agregue , eso lo hago con un spread operator

} */

  const handleSubmit = (e) => {
    e.preventDefault();
    //validar los campos
    if (
      !validateProductName(productName) ||
      !validatePrice(price) ||
      !validateUrl(urlImg) ||
      !validateCategory(category)
    ) {
      Swal.fire("Oops!", "Some data is invalid", "Error");
      return;
    }
    //enviar los datos
    // crear nuevo product
    const newProduct = {
      productName,
      price,
      urlImg,
      category,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //peticion usando fetch
        /*   const res = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }); */
          const res = await axios.post(URL, newProduct)
          console.log(res);
          if (res.status === 201) {
            Swal.fire(
              "Created",
              "Your product have been created successfully",
              "success"
            );
            //resetear el form
            e.target.reset();
            //recargar la tabla
            getAPI();
            //navegar hasta la vista donde esta la tabla
            navigate("/product/table");
          }
        } catch (error) {
          console.log(error);
          error.response.data?.message && setErrorMessaage(error.response.data?.message);
          error.response.data.errors?.lenght > 0 && error.response.data.errors?.map((error)=>
          setErrorMessaage(error.msg))
          setShow(true)
        }
      }
    });
  };

  //general states
  return (
    <div>
      <Container className="py-5">
        <h1>Add Product</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Burger"
              name="productName"
              onChange={({ target }) => setProductName(target.value)}
              //estado general a todos le agrego esta fx onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: 50"
              name="price"
              onChange={({ target }) => setPrice(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              name="urlImg"
              onChange={({ target }) => setUrlImg(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select
              name="category"
              onChange={({ target }) => setCategory(target.value)}
            >
              <option value="">Select an option</option>
              <option value="de-carne">de Carne</option>
              <option value="de-cerdo">de Cerdo</option>
              <option value="de-pollo">de Pollo</option>
              <option value="veganas">Veganas</option>
              <option value="bebidas">Bebidas</option>
              <option value="postre">Postre</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-yellow">Save</button>
          </div>
        </Form>
        {show && (<Alert key={errorMessage} variant='danger' onClose={()=>setShow(false)} dismissible>
{errorMessage}
        </Alert>)}
      </Container>
    </div>
  );
};

export default ProductCreate;
