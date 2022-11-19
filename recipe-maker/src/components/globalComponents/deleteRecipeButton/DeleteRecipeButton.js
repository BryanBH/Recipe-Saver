import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../../redux/recipes/recipeActions";

const DeleteRecipeButton = ({ recipeId }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const deleteRecipeEvent = () => {
    dispatch(deleteRecipe(recipeId));
  };
  return location.pathname === "/user-profile" ? (
    <div className="d-flex justify-content-center align-items-center">
      <Button
        className="bg-darkAccent border border-0 mb-3"
        aria-label="delete recipe"
        onClick={deleteRecipeEvent}>
        Delete Recipe
      </Button>
    </div>
  ) : null;
};

export default DeleteRecipeButton;
