from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Note, User, Recipe, db
from random import randint
from ..forms import NoteForm, NoteEditForm

note_routes = Blueprint('notes', __name__)

@note_routes.route('')
def get_all_notes():
    get_notes = Note.query.all()
    response = [note.to_dict() for note in get_notes]
    return response

@note_routes.route('/<int:id>')
def get_one_note(id):
    get_note = Note.query.get(id)
    return get_note.to_dict()

@note_routes.route('/<int:id>', methods=["DELETE"])
def delete_note(id):
    get_note = Note.query.get(id)
    db.session.delete(get_note)
    db.session.commit()
    return { "Success": "successfully deleted" }

@note_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_note(id):
    form = NoteEditForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note_to_update = Note.query.get(id)
        note_to_update.entry = form.data['entry']

        db.session.commit()
        return { 'editedNote': note_to_update.to_dict() }

    else:
        print(form.errors)
        return { "errors": form.errors }

@note_routes.route('/recipe/<int:recipeId>')
def get_recipe_notes(recipeId):
    get_notes = Note.query.filter_by(recipe_id=recipeId).all()
    response = [note.to_dict_no_recipe() for note in get_notes]
    return response

@note_routes.route('/recipe/<int:recipeId>', methods=["POST"])
@login_required
def post_note(recipeId):
    form = NoteForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        curr_user = User.query.get(current_user.id)
        new_note = Note(
            entry = form.data["entry"],
            user_id=curr_user.id,
            recipe_id=recipeId
        )

        db.session.add(new_note)
        db.session.commit()
        return { 'newNote': new_note.to_dict() }

    else:
        print(form.errors)
        return { "errors": form.errors }
