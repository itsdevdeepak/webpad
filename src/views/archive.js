export default function renderArchive({ id }) {
  const archiveView = document.createElement('div');

  archiveView.innerHTML = `
  <div>
    <h1>Archive ${id || 'Nah'}</h1>
  </div>
  `;

  return archiveView;
}
