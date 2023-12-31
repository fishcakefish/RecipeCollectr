from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text

def seed_recipes():
    recipe1 = Recipe(
        category="dessert",
        title="Strawberry Cheesecake",
        recipe_link="random.com",
        description="Easy to make low calorie cheesecake!",
        user_id=1
    )
    recipe2 = Recipe(
        category="breakfast",
        title="Egg burrito",
        recipe_link="random2.com",
        description="5 minute breakfast burrito",
        user_id=1
    )
    recipe3 = Recipe(
        category="dinner",
        title="Cheddar Cheese Pizza",
        recipe_link="random3.com",
        description="Cheddary Cheesey Pizza for Cheezy Nights",
        user_id=1
    )
    recipe4 = Recipe(
        category="dinner",
        title="Birrita Tacos",
        recipe_link="random4.com",
        description="Juicy tender birrita tacos, 18 hour prep time",
        user_id=1
    )
    recipe5 = Recipe(
        category="lunch",
        title="Bagel Bites",
        recipe_link="random5.com",
        description="Bite Sized Pizzas on Tiny Bagels",
        user_id=2
    )

    all_recipes = [recipe1, recipe2, recipe3, recipe4, recipe5]
    add_recipes = [db.session.add(recipe) for recipe in all_recipes]
    db.session.commit()
    return all_recipes

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()
