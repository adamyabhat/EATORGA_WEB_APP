import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { logout } from "./../redux/actions/auth-actions/logoutAction";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import Loader from "react-loader-spinner";
// import ReactDropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

import logo from "./../assets/pictures/logo.jpg";

function MainNavbar() {
  const { user, auth, loading } = useSelector(state => state.userrr);
  console.log(user,auth,loading);
  const dispatch = useDispatch();
  let history = useHistory();

  const logoutUser = () => {
    dispatch(logout());
    history.push("/");
  };

  // to controll toggle and expand
  const [expanded, setExpanded] = useState(false);

  /* sign up link */
  let signUp;
  if (!auth.isCustomer && !loading) {
    signUp = (
      <Link to='/signup' className='nav-link'>
        Sign Up /
      </Link>
    );
  }

  /* login link */
  let login;
  if (!auth.isCustomer && !loading) {
    login = (
      <Link to='/login' className='nav-link'>
        Login
      </Link>
    );
  }
  // let homepageSelector;
  // if (auth.isCustomer && !loading) {
  //   const options = [
  //     'one', 'two', 'three'
  //   ];
  //   const defaultOption = options[0];
  //   homepageSelector = (
  //     <ReactDropdown options={options} onChange={this.onSelect} value={defaultOption} placeholder="Select an option" />
  //   )
  // }

  /* drop down menu */
  let userDropDown;
  if (loading) {
    userDropDown = <Loader type='ThreeDots' color='#123' width={40} className='mr-5' />;
  } else if (user) {
    userDropDown = (
      <span className='nav-link'>
        <NavDropdown title={user.firstName} id='basic-nav-dropdown'>
          <NavDropdown.Item>
            <Link className='dropdown-item' to='/settings'>
              <i class='fa fa-user-o' aria-hidden='true' />
              My Account
            </Link>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <Link className='dropdown-item' to='/my_addresses'>
              <i class='fa fa-address-book-o' aria-hidden='true' />
              My Addresses
            </Link>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <Link className='dropdown-item' to='/wish_list'>
              <i class='fa fa-heart' aria-hidden='true' />
              Wish List
            </Link>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <Link className='dropdown-item' to='/my_orders'>
              <i class='fa fa-folder' aria-hidden='true' />
              My Orders
            </Link>
          </NavDropdown.Item>

          {/* {dashboard} */}

          <NavDropdown.Divider />

          <NavDropdown.Item onClick={() => logoutUser()}>
            <i class='fa fa-sign-out' aria-hidden='true' />
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </span>
    );
  }

  return (
    <Navbar variant='light' expand='l' background-color='#02700a' className='main-navbar' expanded={expanded}>
      <div>
        <Link to='/'>
          <img
            src={logo}
            width='100'
            style={{
              borderStyle:'solid',
              borderColor:'#02700a'
            }}
            className='d-inline-block align-top'
            alt='React Bootstrap logo'
          />
        </Link>
      </div>

      <div className='navbar-login'>
        {signUp} {login}
      </div>

      <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          className='navbar-toggle'
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav>
          {user && <div className='welcome'>Hello, {user.firstName}</div>}
          {!user && <div className='welcome'>Hello, visitor</div>}
          {/* <div className='shop-by'>Shop by</div>
          <ul>
            <li>
              <Link
                to='/categories'
                className='nav-link'
                onClick={() => setExpanded(false)}>
                All Categories
              </Link>
            </li>
            <li>
              <Link
                to='/products'
                className='nav-link'
                onClick={() => setExpanded(false)}>
                All Products
              </Link>
            </li>
          </ul> */}
          {/* Help and settings */}
          {/* <div className='shop-by'>help & settings</div> */}
          <ul>
            <li>
              <Link
                to='/settings'
                className='nav-link'
                onClick={() => setExpanded(false)}>
                <i class='fa fa-user' aria-hidden='true'></i>
                Your Account
              </Link>
            </li>
            <li>
            <Link 
              to='/my_orders'
              className='nav-link'
              onClick={() => setExpanded(false)}
              >
              <i class='fa fa-folder' aria-hidden='true' />
              Your Orders
            </Link>
            </li>
            <li>
              <Link to='/cart'
              className='nav-link'
              onClick={() => setExpanded(false)}
              >
                <i class='fa fa-shopping-cart cart-icon' aria-hidden='true' />
                Your Cart
              </Link>
            </li>
            <li>
              <Link to='/' className='nav-link' onClick={() => setExpanded(false)}>
                <i class='fa fa-phone' aria-hidden='true'></i>
                Customer Service
              </Link>
            </li>
            {/* <li>
              <Link to='/' className='nav-link' onClick={() => setExpanded(false)}>
                <i class='fa fa-globe' aria-hidden='true'></i>
                English
              </Link>
            </li> */}
            {user && (
              <li>
                <Link
                  to='/'
                  className='nav-link'
                  onClick={() => {
                    logoutUser();
                    setExpanded(false);
                  }}>
                  <i class='fa fa-sign-out' aria-hidden='true'></i>
                  Sign Out
                </Link>
              </li>
            )}
          </ul>
        </Nav>
      </Navbar.Collapse>

      {/* {userDropDown} */}

      {/* {auth.isCustomer && (
        <Link to='/cart'>
          <i class='fa fa-shopping-cart cart-icon' aria-hidden='true' />
        </Link>
      )} */}
    </Navbar>
  );
}

export default MainNavbar;
