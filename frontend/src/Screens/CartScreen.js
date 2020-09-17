import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping")
  }

  return (
    <Cart>
      <CartList>
        <CartListContainer>
          <li>
            <h3>
              Shopping Cart
            </h3>
            <div>
              Price
            </div>
          </li>
          <li>
            {
              cartItems.length === 0 ?
              <div>
                Cart is empty
              </div>
              :
              cartItems.map( item =>
                <CartItems>
                  <Image src={item.image} alt="product"/>
                  <CartName>
                    <div>
                      <Link to={"/product/" + item.product}>
                        {item.name}
                      </Link>
                    </div>
                    <select 
                      value={item.qty} 
                      onChange={(e) => 
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                    </select>
                    <Button type="button" onClick={() => removeFromCartHandler(item.product)}>
                      Delete
                    </Button>
                  </CartName>
                  <CartPrice>
                    ${item.price}
                  </CartPrice>
                </CartItems>
              )
            }
          </li>
        </CartListContainer>
      </CartList>
      <CartAction>
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
          : 
          $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <ButtonPrimary  onClick={checkoutHandler} disabled={cartItems.length === 0}>
          Proceed to Checkout
        </ButtonPrimary>
      </CartAction>
    </Cart>
  )
}

const Cart = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  align-items: flex-start;
`;

const CartList = styled.div`
  flex: 3 1 60rem;
`;

const CartListContainer = styled.div`
  padding: 1rem;
  list-style-type: none;
  border-bottom: .1rem solid silver;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  li:first-child{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: .1rem solid silver;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  };
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 20px;
`;

const Image = styled.img`
  max-width: 10rem;
  max-height: 10rem;
`;

const CartName = styled.div`
  flex: 8 1;
`;

const Button = styled.button`
  font-size: 1.6rem;
`;

const CartPrice = styled.div`
  flex: 1 1;
  text-align: right;
  font-size: 2.5rem;
`;

const CartAction = styled.div`
  flex: 1 1 20rem;
  background-color: #f8f8f8;
  border-radius: .5rem;
  padding: 1rem;
`;

const ButtonPrimary = styled.button``;

export default CartScreen;