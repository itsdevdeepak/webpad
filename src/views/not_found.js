export default function renderNotFound() {
  const noteFoundView = document.createElement('div');
  noteFoundView.innerHTML = `<h1>Not Found</h1>`;

  return noteFoundView;
}
