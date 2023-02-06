const { nanoid } = require('nanoid');
const notes = require('./notes');

// Add Note Handler
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  // const id = nanoid(16);
  // const createdAt = new Date().toISOString();
  // const updatedAt = createdAt;

  function currentDate() {
    return new Date().toISOString();
  }

  const newNote = {
    title,
    tags,
    body,
    id: nanoid(16),
    createdAt: currentDate(),
    updatedAt: currentDate(),
  }; notes.push(newNote);

  const isSuccess = notes.filter((i) => i.id === newNote.id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: newNote.id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Get All Note Handler
const getAllNotesHandler = () => ({
  status: 'success',
  data: { notes },
});

// Get Note By ID Handler
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.find((i) => i.id === id);

  if (note !== undefined) {
    return {
      status: 'success',
      data: { note },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Edit Note By ID Handler
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((i) => i.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. ID tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Delete Note By ID Handler
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((i) => i.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. ID tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
