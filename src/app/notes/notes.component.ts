import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];

  selectedNote: Note = {
    id: null,
    text: ''
  };

  constructor(private noteService: NoteService) { }

  getNotes(): void {
    // if (this.project) {
      this.noteService.getNotes()
        .subscribe(notes => this.notes = notes);
    // }
  }


  addNote(): void {
    // if (this.project) {
      const newNote: Note = {
        id: null,
        text: ''
      };
      this.noteService.addNote(newNote)
        .subscribe(note => this.notes.push(note));
      // this.selectNote(this.getLastNote());
    // }
  }

  saveNote(note: Note): void {
    // if (this.project) {
      const newNote: Note = {
        id: note.id,
        text: note.text
      };
      this.noteService.updateNote(newNote)
        .subscribe();
    // }
  }

  deleteNote(note: Note): void {
    // if (this.project && confirm('Are you sure you want to delete this note?')) {
      this.notes = this.notes.filter(n => n !== note);
      this.noteService.deleteNote(note).subscribe();
    // }
  }

  selectNote(note: Note): void {
    this.selectedNote = note;
  }

  // getLastNote(): Note {
  //   const note = this.notes[this.notes.length];
  //   return note;
  // }

  ngOnInit(): void {
    this.getNotes();
  }

}
