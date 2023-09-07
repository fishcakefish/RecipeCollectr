from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    note1 = Note(
        entry="get *this* brand of strawberries",
        user_id=1,
        recipe_id=1
    )
    note2 = Note(
        entry="note to self: dont have this too often",
        user_id=1,
        recipe_id=2
    )
    note3 = Note(
        entry="add another pound of cheddar next time",
        user_id=1,
        recipe_id=3
    )

    all_notes = [note1, note2, note3]
    add_notes = [db.session.add(note) for note in all_notes]
    db.session.commit()
    return all_notes

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
