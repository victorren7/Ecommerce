import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function HomeScreen (props) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const {data} = await axios.get("/api/products");
      setProducts(data)
    }
    fetchData();
    return () => {
      //
    }
  }, [])

  return (
    <Products>
      {
        products.map(product => 
          <Li className="product" key={product._id}>
          <Product>
            <Link to={'/product/' + product._id}>
              <Image src={product.image} alt='shirt' className="product-image"/>
            </Link>
            <LinkStyle to={'/product/' + product._id}>
              <ProductName >{product.name}</ProductName>
            </LinkStyle>
            <ProductBrand>{product.brand}</ProductBrand>
            <ProductPrice>${product.price}</ProductPrice>
            <ProductRating>{product.rating} Stars {product.numReviews}</ProductRating>
          </Product>
        </Li> 
        )
      }    
    </Products>
  )
};

const Products = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Li = styled.li`
  list-style-type: none;
  padding: 0;
  flex: 0 1 34rem;
  margin: 1rem;
  height: 50rem;
  border-bottom: .1rem #c0c0c0 solid;
`;

const Image = styled.img`
  max-width: 34rem;
  max-height: 34rem;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
`;

const ProductName = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;  

const ProductBrand = styled.div`
  font-size: 1.2rem;
  color: #808080;
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const ProductRating = styled.div`
  margin-bottom: 1rem;
`;

export default HomeScreen;

