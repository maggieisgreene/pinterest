import './singleBoard.scss';

const boardCardBuilder = (board) => {
  let domString = '';
  if (board.name) {
    domString += `
  <div class="card col-3 individualBoard">
    <img src=${board.previewImageUrl} class="card-img-top" alt="Image of ${board.name}">
    <div class="card-body">
      <h5 class="card-title">${board.name}</h5>
    </div>
  </div>`;
  }
  return domString;
};

export default { boardCardBuilder };
