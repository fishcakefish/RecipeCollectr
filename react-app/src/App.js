import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage";
import RecipeCreate from "./components/RecipeCreate";
import RecipeCategory from "./components/RecipeCategory";
import RecipeOne from "./components/RecipeOne";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/create">
            <RecipeCreate />
          </Route>
          <Route path="/myrecipes/:category">
            <RecipeCategory />
          </Route>
          <Route path="/:recipeId">
            <RecipeOne />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
