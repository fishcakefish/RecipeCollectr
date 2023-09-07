from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Recipe(db.Model, UserMixin):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    recipe_link = db.Column(db.String(400), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship("User", back_populates="recipes")

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "title": self.title,
            "recipe_link": self.recipe_link,
            "description": self.description,
            "user": self.user.to_dict()
        }
