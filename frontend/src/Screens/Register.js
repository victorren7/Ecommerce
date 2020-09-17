import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Register = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);

  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
  }, [userInfo, props])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }

  return (
    <Form>
      <form onSubmit={submitHandler}>
        <FormContainer>
          <Li>
            <h2>Create Accounr</h2>
          </Li>
          <Li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

          </Li>
          <Li>
            <label htmlFor='name'>Name</label>
            <Input type='name' name='name' id='name' onChange={(e) => setName(e.target.value)}/>
          </Li>
          <Li>
            <label htmlFor='email'>Email</label>
            <Input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)}/>
          </Li>
          <Li>
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </Li>
          <Li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <Input type="rePassword" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)} />
          </Li>
        <Li>
          <ButtonLink type="submit">Register</ButtonLink>
        </Li>
        <Li>
          Already have an account?
          <Link to='/signin'>
            Sign In
          </Link>
        </Li>
        </FormContainer>
      </form>
    </Form>
  );
};

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

export default Register;