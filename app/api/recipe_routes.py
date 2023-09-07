from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Recipe, db

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route('')
def all_recipes():
    get_recipes = Recipe.query.all()
    response = [recipe.to_dict() for recipe in get_recipes]
    return response

# @recipe_routes.route('random')
# def random_recipe():
