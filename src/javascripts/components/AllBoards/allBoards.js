import boardsData from '../../helpers/data/boardsData';
import singleBoard from '../SingleBoard/singleBoard';
import utilities from '../../helpers/utilities';

const printBoards = () => {
  boardsData.getBoard()
    .then((boards) => {
      let domString = '';
      domString += '<div id="boards-section" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += singleBoard.boardCardBuilder(board);
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
