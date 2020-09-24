import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';
import styled from 'styled-components';

function CreateProduct(props) {

  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  // const [rating, setRating] = useState('');
  // const [numReview, setNumReview] = useState('');
  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList

  const productSave = useSelector(state => state.productSave);
  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave
  } = productSave;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setShowModal(false);
    }
    dispatch(listProducts());
  }, [dispatch, successSave, successDelete])

  const openModal = (product) => {
    setShowModal(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      name, price, image, brand,
      category, countInStock, description
    }));
  }

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id))
  }

  return (
    <Content>
      <ProductHeader>
        <h3>Porudtcs</h3>
        <ButtonLink onClick={() => openModal({})}>Create Product</ButtonLink>
      </ProductHeader>
      {showModal &&
        <Form>
          <form onSubmit={submitHandler}>
            <FormContainer>
              <Li>
                <h2>Create Product</h2>
              </Li>
              <Li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}

              </Li>
              <Li>
                <label htmlFor='name'>Name</label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Li>
              <Li>
                <label htmlFor='price'>Price</label>
                <Input
                  type='text'
                  name='price'
                  id='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Li>
              <Li>
                <label htmlFor='image' >Image</label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Li>
              <Li>
                <label htmlFor='brand' value={brand}>Brand</label>
                <Input
                  type='text'
                  name='brand'
                  id='brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Li>
              <Li>
                <label htmlFor='in-stock'>
                  In Stock
                </label>
                <Input
                  type='text'
                  name='countInStock'
                  id='countInStock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Li>
              <Li>
                <label htmlFor='category' value={category}>Category</label>
                <Input
                  name='category'
                  id='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Li>
              <Li>
                <label htmlFor='description' value={description}>
                  Desciption
                </label>
                <textarea name='description' id='description' onChange={(e) => setDescription(e.target.value)} />
              </Li>
              <Li>
                <ButtonLink type="submit">
                  {id ? 'Update' : 'Create'}
                </ButtonLink>
                <ButtonLink type="submit" onClick={() => setShowModal(false)}>
                  Back
              </ButtonLink>
              </Li>
            </FormContainer>
          </form>
        </Form>
      }
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {console.log('products', products)}
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                  onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Content>
  )
};

const Content = styled.div``;

const ProductHeader = styled.div``;

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 32rem;
  padding: 2rem;
  border: .1rem #c0c0c0 solid;
  border-radius: 0.5rem;
  list-style-type: none;
`;

const Input = styled.input`
  padding: 1rem;
  border: .1rem #c0c0c0 solid;
  border-radius: .5rem;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const ButtonLink = styled.button`
  padding: 1rem;
  border: 0.1rem #808080 solid;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: ${props => props.secondary ? '#f0f0f0' : '#f0c040'};
  text-align: center;
`;

export default CreateProduct;


