import React, { useEffect } from "react";
import { Page, Navbar, Block, BlockTitle } from "framework7-react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../js/actions";

const createPage = () => {
  const counter = useSelector((state) => state.counter);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  return (
    <Page>
      <Navbar title='About' backLink='Back' />
      <BlockTitle>About My App</BlockTitle>
      <Block strong>
        <p>Hola que tal</p>
        {currentUser.loggedIn ? (
          <>
            <h1>Hello, {currentUser.user.name}</h1>
            <button onClick={() => dispatch(allActions.userActions.logOut())}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h1>Login</h1>
            <button
              onClick={() => dispatch(allActions.userActions.setUser(user))}
            >
              Login as Rei
            </button>
          </>
        )}
        <h1>Counter: {counter}</h1>
        <button onClick={() => dispatch(allActions.counterActions.increment())}>
          Increase Counter
        </button>
        <button onClick={() => dispatch(allActions.counterActions.decrement())}>
          Decrease Counter
        </button>
      </Block>
    </Page>
  );
};

export default createPage;
