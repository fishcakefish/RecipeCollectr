from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Recipe, db
from random import randint

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

@recipe_routes.route('/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    get_recipe = Recipe.query.get(id)
    db.session.delete(get_recipe)
    db.session.commit()
    return { "Success": "successfully deleted" }

@recipe_routes.route('/random')
def get_random_recipe():
    count = Recipe.query.count()
    random_id = randint(1, count)
    get_recipe = Recipe.query.get(random_id)
    return get_recipe.to_dict()

@recipe_routes.route('/post', methods=["POST"])
@login_required
def post_recipe():
    pass

@recipe_routes.route('/edit/<int:id>', methods=["PUT"])
@login_required
def edit_recipe(id):
    pass
