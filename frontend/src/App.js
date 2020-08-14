import React, {useState} from 'react';
import styled from 'styled-components';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false)



  const openMenu = () => {
    setSidebarOpen(true);
  };
  const closeMenu = () => {
    setSidebarOpen(false);
  }

  console.log('sidebarOpen', sidebarOpen)

  return (
    <BrowserRouter>
      <GridContainer>
        <Header>
          <div>
            <Button onClick={openMenu}>
              &#9776;
            </Button>
            <LinkStyle to='/'>
              Victor's Closet
            </LinkStyle>
          </div>
          <Grid>
            <Anchor href="cart.html">Cart</Anchor>
            <Anchor href="signin.html">Sign In</Anchor>
          </Grid>
        </Header>
        <div>
        {sidebarOpen === true &&
          <Sidebar className='sidebar'>
            <h3>Shopping cateogries</h3>
            <SidebarClose className="sidebar-close-button" onClick={closeMenu}>x</SidebarClose>
            <ul>
              <li>
                <A href="index.html">Pants</A>
              </li>
              <li>
                  <A href="index.html">Shirts</A>
                </li>
            </ul>
          </Sidebar>
        }
        </div>
        <Main >
          <div className="content">
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/" component={HomeScreen} exact={true} />
          </div>
        </Main>
        <Footer >
          All rights reserved.
        </Footer>
      </GridContainer>
    </BrowserRouter>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-areas: "header" "main" "footer";
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr 5rem;
  height: 100%;
`;

const Header = styled.header`
  grid-area: header;
  background-color: #203040;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
`;

const Button = styled.button`
  font-size: 3rem;
  padding: .5rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const LinkStyle = styled(Link)`
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  text-decoration: none;
`;

const A = styled.a`
  text-decoration: none;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
`;

const Anchor = styled.a`
  color: #fff;
  text-decoration: none;
  :hover {
    color: #ff8000;
  }
`;

const Sidebar = styled.aside`
  position: absolute;
  top: 9.1%;
  width: 25%;
  background-color: aliceblue;
  height: 100%;
`;

const Main = styled.main`
  grid-area: main;
`;

const SidebarClose = styled.button`
  border-radius: 50%;
  border: .1rem #000 solid;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  padding-top: 0;
  cursor: pointer;
  position: absolute;
  right: .5rem;
  top: .5rem;
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: #203040;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center; 
`;

export default App;
