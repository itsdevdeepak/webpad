import Router from './services/router.js';
import renderArchives from './views/archives.js';
import renderNote from './views/note.js';
import renderNotes from './views/notes.js';
import renderArchive from './views/archive.js';
import Theme from './services/theme.js';

function init() {
  window.store = {};

  const routes = {
    '/': { location: '.main', view: renderNotes },
    '/notes': { location: '.main', view: renderNotes },
    '/notes/id/:id': { location: '.note', view: renderNote },
    '/archives': { location: '.main', view: renderArchives },
    '/archives/id/:id': { location: '.main', view: renderArchive }
  };

  // const redirects = {
  //   '/': '/notes'
  // };
  const router = new Router(routes);
  const theme = new Theme();
  theme.init();
  router.init();
}

document.addEventListener('DOMContentLoaded', init);
