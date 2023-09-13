from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Note(db.Model, UserMixin):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    entry = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)

    user = db.relationship("User", back_populates="notes")
    recipe = db.relationship("Recipe", back_populates="notes")

    def to_dict(self):
        return {
            "id": self.id,
            "entry": self.entry,
            "user": self.user.to_dict(),
            "recipe": self.recipe.to_dict()
        }

    def to_dict_no_recipe(self):
        return {
            "id": self.id,
            "entry": self.entry,
            "user": self.user.to_dict()
        }
