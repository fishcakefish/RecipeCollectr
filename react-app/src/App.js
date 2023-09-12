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
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          <ProtectedRoute exact path="/">
            <MainPage />
          </ProtectedRoute>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path="/create">
            <RecipeCreate />
          </ProtectedRoute>
          <ProtectedRoute path="/myrecipes/:category">
            <RecipeCategory />
          </ProtectedRoute>
          <ProtectedRoute path="/:recipeId">
            <RecipeOne />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
