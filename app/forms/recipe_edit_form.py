from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, URLField, SelectField
from wtforms.validators import DataRequired

class RecipeEditForm(FlaskForm):
    category=SelectField('Category', choices=['breakfast', 'lunch', 'dinner', 'dessert'])
    title=StringField('Title', validators=[DataRequired()])
    recipe_link=URLField('Recipe Link', validators=[DataRequired()])
    description=StringField('Description', validators=[DataRequired()])
    submit=SubmitField('Edit Recipe')
