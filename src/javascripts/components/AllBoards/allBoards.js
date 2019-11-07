import $ from 'jquery';
import './allBoards.scss';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import pinView from '../PinView/pinView';
import singleBoard from '../SingleBoard/singleBoard';
import utilities from '../../helpers/utilities';

const deletePinByClick = (event) => {
  event.preventDefault();
  const deleteButton = event.target.className;
  if (deleteButton === 'delete-pin') {
    pinsData.deletePin('pin1')
      .then(() => console.error('hyyyyy'))
      .catch((error) => console.error(error));
  }
};

const exitPins = () => {
  $('#pins').on('click', '#exit-pins', () => {
    const boardsDiv = $('#boards');
    const pinsDiv = $('#pins');
    boardsDiv.removeClass('hide');
    pinsDiv.addClass('hide');
  });
};

const printPins = (event) => {
  const boardId = event.target.id;
  pinsData.getPinByBoardId(boardId)
    .then((pins) => {
      let domStringTwo = '';
      domStringTwo += `<div class="d-flex flex-wrap justify-content-between header-stuff"><h2>${boardId}</h2>`;
      domStringTwo += '<button class="btn btn-light" id="exit-pins">Go Back</button></div>';
      domStringTwo += '<div id="pins-section" class="d-flex flex-wrap">';
      pins.forEach((pin) => {
        domStringTwo += pinView.printPinCards(pin);
      });
      domStringTwo += '</div>';
      utilities.printToDom('pins', domStringTwo);
    })
    .catch((error) => console.error(error));
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
      $('#pins').on('click', '.delete-pin', deletePinByClick);
      exitPins();
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
