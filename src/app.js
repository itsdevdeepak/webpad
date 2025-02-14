import Router from './services/router.js';
import renderArchives from './views/archives.js';
import renderNote from './views/note.js';
import renderNotes from './views/notes.js';
import renderArchive from './views/archive.js';

function init() {
  window.store = {};

  const routes = {
    '/notes': { location: '.main', view: renderNotes },
    '/notes/id/:id': { location: '.note', view: renderNote },
    '/archives': { location: '.main', view: renderArchives },
    '/archives/id/:id': { location: '.main', view: renderArchive }
  };

  const redirects = {
    '/': '/notes'
  };

  const router = new Router(routes, redirects);

  router.init();
}

document.addEventListener('DOMContentLoaded', init);
