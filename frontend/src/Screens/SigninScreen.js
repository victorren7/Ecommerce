import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import styled from 'styled-components';

function SigninScreen (props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);

  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
  }, [userInfo, props])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  }

  return (
    <Form>
      <form onSubmit={submitHandler}>
        <FormContainer>
          <Li>
            <h2>Sign in</h2>
          </Li>
          <Li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

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
          <ButtonLink type="submit">Signin</ButtonLink>
        </Li>
        <Li>
          New to amazona?
        </Li>
        <Li>
          <ButtonLink to={"/register"} secondary='true'>Create your amazona account</ButtonLink>
        </Li>
        </FormContainer>
      </form>
    </Form>
  )
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

export default SigninScreen;


