from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class NoteForm(FlaskForm):
    entry=StringField('Entry', validators=[DataRequired()])
    submit=SubmitField('Edit Recipe')
