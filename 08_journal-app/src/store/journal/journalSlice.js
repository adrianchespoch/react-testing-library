import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',

  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null,
  },

  reducers: {
    // Toolkit nos permite escribir codigo mutante, pero NO muta el state
    savingNewNote: state => {
      state.isSaving = true;
    },
    setSaving: state => {
      state.isSaving = true;
      state.messageSaved = '';
    },

    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.activeNote = payload;
      state.messageSaved = '';
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },

    // Actualizar el store
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map(note =>
        note.id === payload.id ? payload : note
      );

      // message
      state.messageSaved = `${payload.title}, successfully updated`;
    },

    // payload = id
    deleteNoteByID: (state, { payload }) => {
      state.isSaving = false;
      state.activeNote = null;
      state.notes = state.notes.filter(note => note.id !== payload);
    },

    setPhotosToActiveNote: (state, { payload }) => {
      state.isSaving = false;
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...payload];
    },

    clearNotesLogout: state => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.activeNote = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteByID,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
