from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Recipe, User, db
from random import randint
from ..forms import RecipeForm, RecipeEditForm

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

@recipe_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_recipe(id):
    form = RecipeEditForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        recipe_to_update = Recipe.query.get(id)
        recipe_to_update.category = form.data['category']
        recipe_to_update.title = form.data['title']
        recipe_to_update.recipe_link = form.data['recipe_link']
        recipe_to_update.description = form.data['description']

        db.session.commit()
        return { 'editedRecipe': recipe_to_update.to_dict() }

    else:
        print(form.errors)
        return {"errors": form.errors }

@recipe_routes.route('/create', methods=["POST"])
@login_required
def post_recipe():
    form = RecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print("@@@@IN FORM VALIDATE")
        curr_user = User.query.get(current_user.id)
        new_recipe = Recipe(
            category = form.data["category"],
            title = form.data["title"],
            recipe_link = form.data['recipe_link'],
            description = form.data['description'],
            user_id=curr_user.id
        )
        print("@@@PAST NEW_RECIPE")
        print(new_recipe)

        db.session.add(new_recipe)
        db.session.commit()
        return { 'newRecipe': new_recipe.to_dict() }

    else:
        print(form.errors)
        return {"errors": form.errors }

@recipe_routes.route('/random')
def get_random_recipe():
    count = Recipe.query.count()
    random_id = randint(1, count)
    get_recipe = Recipe.query.get(random_id)
    return get_recipe.to_dict()

@recipe_routes.route('/user')
@login_required
def get_user_recipes():
    curr_user = User.query.get(current_user.id)
    get_recipes = Recipe.query.filter_by(user_id=curr_user.id).all()
    response = [recipe.to_dict() for recipe in get_recipes]
    return response
