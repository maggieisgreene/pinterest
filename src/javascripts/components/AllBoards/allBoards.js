import $ from 'jquery';
import boardsData from '../../helpers/data/boardsData';
import singleBoard from '../SingleBoard/singleBoard';
import utilities from '../../helpers/utilities';

const printPins = () => {
  const boardsDiv = $('#boards');
  const pinsDiv = $('#pins');
  boardsDiv.addClass('hide');
  pinsDiv.removeClass('hide');
};

const printBoards = (uid) => {
  boardsData.getBoardByUid(uid)
    .then((boards) => {
      let domString = '';
      domString += '<div id="boards-section" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += singleBoard.boardCardBuilder(board);
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('#boards').on('click', '.individualBoard', printPins);
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
