import './switchBoard.scss';

const importSwitchBoardModal = (pin) => {
  let domString = '';
  domString += `
  <div class="modal fade" id="switchBoardModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Switch Board</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>`;
  domString += `
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input bread" id="board-name">
            <label class="form-check-label" for="${pin.boardId}">${pin.boardId}</label>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input bread" id="board-name">
            <label class="form-check-label" for="${pin.boardId}">Fashionistas</label>
          </div>
          <div class="form-group">
            <input type="checkbox" class="form-control" id="board-image-url" placeholder="Enter Preview Image Url">`;
  domString += `</div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-secondary" id="switch-new-board">Switch Board</button>
      </div>
    </div>
  </div>
</div>`;
  return domString;
};

export default { importSwitchBoardModal };
