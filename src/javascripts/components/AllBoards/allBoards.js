import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import './allBoards.scss';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
// import smash from '../../helpers/data/smash';
import pinView from '../PinView/pinView';
import singleBoard from '../SingleBoard/singleBoard';
import switchBoard from '../SwitchBoard/switchBoard';
import utilities from '../../helpers/utilities';
import smash from '../../helpers/data/smash';

const switchBoardButtonClick = (event) => {
  // const { uid } = firebase.auth().currentUser;
  const id = $(event.target).attr('store-pinId');
  const myInput = $('#exampleFormControlSelect1').val();
  pinsData.getPinById(id)
    .then((pin) => {
      const pinToEdit = { ...pin };
      pinToEdit.boardId = myInput;
      pinsData.updatePin(id, pinToEdit)
        .then(() => {
          $('#switchBoardModal').modal('hide');
          // eslint-disable-next-line no-use-before-define
          printPins(myInput);
        });
    })
    .catch();
};

const addNewIndividualBoard = (event) => {
  event.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    name: $('#board-name').val(),
    description: $('#board-description').val(),
    uid,
    previewImageUrl: $('#board-image-url').val(),
  };
  boardsData.addNewBoard(newBoard)
    .then(() => {
      $('#addBoardModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printBoards(uid);
    })
    .catch();
};

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

const getPinIdAndPuttingItOnAnotherButton = (event) => {
  const pinId = $(event.target).closest('.card').attr('id');
  $('#switch-new-board').attr('store-pinId', pinId);
};

const printPins = (boardId) => {
  smash.getPinByBoardIdWithBoardName(boardId)
    .then((pins) => {
      let domStringTwo = '';
      domStringTwo += '<div class="d-flex flex-wrap justify-content-between header-stuff"><h2>BoARD</h2>'; // ${pins[0].boardName} add for name of board at top -- but erases everything if no pins
      domStringTwo += '<div class="d-flex flex-wrap">';
      domStringTwo += `<button class="btn btn-light" id="add-pin" data-toggle="modal" data-target="#exampleModal" data-board-id="${boardId}">Create Pin</button>`;
      domStringTwo += '<button class="btn btn-light" id="exit-pins">Go Back</button></div></div>';
      domStringTwo += '<div id="pins-section" class="d-flex flex-wrap">';
      pins.forEach((pin) => {
        domStringTwo += pinView.printPinCards(pin);
        switchBoard.importSwitchBoardModal();
      });
      domStringTwo += '</div>';
      $('#add-new-pin').attr('data-store-id', boardId);
      utilities.printToDom('pins', domStringTwo);
      $('.switch-board').click(getPinIdAndPuttingItOnAnotherButton);
      $('#switch-new-board').click(switchBoardButtonClick);
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
      domString += `
      <div class="card col-3 addBoard" id="board-adding-div">
        <img src="https://s7d5.scene7.com/is/image/DecorOnline/roller-shades_11370343" class="card-img-top addBoardImg" alt="Add New Board">
        <div class="card-body">
          <div class="d-flex flex-wrap justify-content-between"><h5 class="card-title">Add Board</h5><h4 class="add-board" data-toggle="modal" data-target="#addBoardModal">+</h4></div>
        </div>
      </div>`;
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('#boards').on('click', '.individualBoard', printPinsEventHandler);
      $('#boards').on('click', '.delete-board', deleteBoardByClick);
      $('#pins').on('click', '.delete-pin', deletePinByClick);
      $('#add-new-pin').click(addNewPin);
      $('#add-new-board').click(addNewIndividualBoard);
      exitPins();
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
