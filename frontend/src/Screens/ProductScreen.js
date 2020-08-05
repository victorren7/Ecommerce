import React from 'react';
import {Link} from 'react-router-dom';
import data from '../data';
import styled from 'styled-components';

function ProductScreen (props) {
  const product = data.products.find(x => x._id === props.match.params.id)
  return (
    <div>
      <BackToResults>
        <Link to="/">Back to results</Link>
      </BackToResults>
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
              Price: {product.status}
            </Li>
            <Li>
              Qty: 
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </Li>
            <Li>
              <Button>Add to cart</Button>
            </Li>
          </Ul>
        </DetailsAction>
      </Details>
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

