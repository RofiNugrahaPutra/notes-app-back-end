const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;

/*
 Perhatikan route konfigurasi di atas. Jangan lupa untuk memberikan options.auth
 dengan nilai notesapp_jwt. Mengapa? Karena nantinya pada proses menambahkan atau
 menghapus kolaborasi dibutuhkan informasi pengguna autentik untuk menentukan resource
 dapat diakses atau tidak.
 */
