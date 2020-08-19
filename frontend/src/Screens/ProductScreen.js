import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import styled from 'styled-components';

function ProductScreen (props) {
  const [qty, setQty] = useState(1)
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      // cleanup
    }
  }, [])

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }

  return (
    <div>
      <BackToResults>
        <Link to="/">Back to results</Link>
      </BackToResults>
      {
        loading ? <div>Loading...</div> : 
        error ? <div>{error}</div> :
        <Details>
          <DetailsImage>
            <Image src={product.image} alt="product"/>
          </DetailsImage>
          <DetailsInfo>
            <Ul>
              <Li>
                <h4>{product.name}</h4>
              </Li>
              <Li>
                <h4>{product.rating} Stars ({product.numReviews})</h4>
              </Li>
              <Li>
                Price: <b>${product.price}</b>
              </Li>
              <Li>
                Description:
                <div>{product.description}</div>
              </Li>
            </Ul>
          </DetailsInfo>
          <DetailsAction>
            <Ul>
              <Li>
                Price: {product.price}
              </Li>
              <Li>
                Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </Li>
              <Li>
                Qty: 
                <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                  {[...Array(product.countInStock).keys()].map(x=> 
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  )}
                </select>
              </Li>
              <Li>
                {product.countInStock > 0 &&
                  <Button onClick={handleAddToCart}>Add to cart</Button>
                }
              </Li>
            </Ul>
          </DetailsAction>
        </Details>
      }
    </div>
  )
};

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 1rem;
`;

const BackToResults = styled.div`
  padding: 1rem;
`;

const DetailsImage = styled.div`
  flex: 2 1 60rem;
`;

const Image = styled.img`
  max-width: 30rem;
  widows: 100%; 
`;

const DetailsInfo = styled.div`
  flex: 1 1 30rem;
`;

const DetailsAction = styled.div`
  flex: 1 1 30rem;
  border: .1rem #808080 solid;
  border-radius: .5rem;
  background-color: #f8f8f8;
  padding: 1rem;
`;

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Li = styled.li`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  border: .1rem #808080 solid;
  border-radius: .5rem;
  background-color: palegreen;
  width: 6.5rem;
  height: 1.8rem;
  cursor: pointer;
  :hover{
    border-color: #f0f0f0;
  }
`;

export default ProductScreen;

