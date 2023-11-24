/* eslint-disable react-hooks/exhaustive-deps */
import axios from "../../../config/axiosInit";
import { useEffect, useState } from "react";
import { Card, CardText, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const URL = import.meta.env.VITE_API_HAMBURGUESERIA;

  const { id } = useParams();
  const [product, setProduct] = useState({});
  //defino fx para recuperar el objeto
  const getOne = async () => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      const productApi = res.data;
      setProduct(productApi);
    } catch {
      console.log("hubo un error");
    }
  };

  useEffect(() => {
    getOne();
  }, []);

  return (
    <Container className="m-3">
      <Card>
        <Row>
          <Col xl={5} lg={5} md={5}>
            <Card.Img
              variant="top"
              src={product?.urlImg}
              className="img-fluid w-100"
            />
          </Col>
          <Col xl={7} lg={7} md={7}>
            <Card.Body>
              <Card.Title>{product?.productName}</Card.Title>
              <CardText> Categoria: {product?.category} </CardText>

              <Card.Text>{product?.category}
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos commodi tempora quam qui obcaecati expedita hic in earum, omnis harum! </Card.Text>
             <CardText className="fw-bold">$ {product?.price} </CardText>

              <Link
                to="/"
                className="btn-red text-decoration-none text-center"
              >
                Buy
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProductDetails;
