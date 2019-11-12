import './singleBoard.scss';

const boardCardBuilder = (board) => {
  let domString = '';
  if (board.name) {
    domString += `
  <div class="card col-3 individualBoard" id="${board.id}" store-boardName="${board.name}">
    <img src=${board.previewImageUrl} class="card-img-top boardImg" alt="Image of ${board.name}">
    <div class="card-body">
      <div class="d-flex flex-wrap justify-content-between"><h5 class="card-title">${board.name}</h5><h5 class="delete-board">x</h5></div>
    </div>
  </div>`;
  }
  return domString;
};

export default { boardCardBuilder };
