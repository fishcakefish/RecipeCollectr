from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class NoteEditForm(FlaskForm):
    entry=StringField('Entry', validators=[DataRequired()])
    submit=SubmitField('Edit Recipe')
