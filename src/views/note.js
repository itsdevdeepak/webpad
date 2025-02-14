export default function renderNote({ id }) {
  const noteView = document.createElement('div');
  noteView.innerHTML = `<h1>Note ${id ? id : 'NOP'}</h1>`;

  return noteView;
}
