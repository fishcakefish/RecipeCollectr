from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Recipe, db

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route('')
def get_all_recipes():
    get_recipes = Recipe.query.all()
    response = [recipe.to_dict() for recipe in get_recipes]
    return response

@recipe_routes.route('/<int:id>')
def get_one_recipe(id):
    get_recipe = Recipe.query.get(id)
    return get_recipe.to_dict()

# @recipe_routes.route('random')
# def random_recipe():
