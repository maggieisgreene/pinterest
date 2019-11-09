import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import './allBoards.scss';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import pinView from '../PinView/pinView';
import singleBoard from '../SingleBoard/singleBoard';
import utilities from '../../helpers/utilities';

const addNewPin = (event) => {
  event.stopImmediatePropagation();
  const boardId = event.target.getAttribute('data-store-id');
  const newPin = {
    name: $('#pin-name').val(),
    imageUrl: $('#pin-image-url').val(),
    siteUrl: $('#pin-image-url').val(),
    description: $('#pin-description').val(),
    boardId,
  };
  pinsData.addNewPin(newPin)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printPins(boardId);
    })
    .catch((error) => console.error(error));
};

const deletePinByClick = (event) => {
  event.preventDefault();
  const deleteButton = event.target.className;
  if (deleteButton === 'delete-pin') {
    pinsData.deletePin(event.target.closest('.card').id)
      .then(() => {
        const boardId = event.target.closest('.card').className.split('card col-3 individual-pin ')[1];
        // eslint-disable-next-line no-use-before-define
        printPins(boardId);
      })
      .catch((error) => console.error(error));
  }
};

const deleteBoardByClick = (event) => {
  event.stopImmediatePropagation();
  const deleteBoard = event.target.className;
  const boardId = event.target.closest('.card').id;
  const { uid } = firebase.auth().currentUser;
  if (deleteBoard === 'delete-board') {
    boardsData.deleteBoard(boardId)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        printBoards(uid);
        // pinsData.deletePinByBoardId(boardId)
        //   .then(() => console.error('from deleteboardbyclick', boardId));
      })
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

const printPins = (boardId) => {
  pinsData.getPinByBoardId(boardId)
    .then((pins) => {
      let domStringTwo = '';
      domStringTwo += '<div class="d-flex flex-wrap justify-content-between header-stuff"><h2>Board</h2>'; // ${pins[0].boardName} add for name of board at top -- but erases everything if no pins
      domStringTwo += '<div class="d-flex flex-wrap">';
      domStringTwo += `<button class="btn btn-light" id="add-pin" data-toggle="modal" data-target="#exampleModal" data-board-id="${boardId}">Create Pin</button>`;
      domStringTwo += '<button class="btn btn-light" id="exit-pins">Go Back</button></div></div>';
      domStringTwo += '<div id="pins-section" class="d-flex flex-wrap">';
      pins.forEach((pin) => {
        domStringTwo += pinView.printPinCards(pin);
      });
      domStringTwo += '</div>';
      $('#add-new-pin').attr('data-store-id', boardId);
      utilities.printToDom('pins', domStringTwo);
    })
    .catch((error) => console.error(error));
  const boardsDiv = $('#boards');
  const pinsDiv = $('#pins');
  boardsDiv.addClass('hide');
  pinsDiv.removeClass('hide');
};

const printPinsEventHandler = (event) => {
  const boardId = event.target.id;
  printPins(boardId);
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
      $('#boards').on('click', '.individualBoard', printPinsEventHandler);
      $('#boards').on('click', '.delete-board', deleteBoardByClick);
      $('#pins').on('click', '.delete-pin', deletePinByClick);
      $('#add-new-pin').click(addNewPin);
      exitPins();
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
