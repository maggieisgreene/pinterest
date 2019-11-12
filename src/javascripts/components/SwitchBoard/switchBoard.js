import firebase from 'firebase/app';
import 'firebase/auth';
import './switchBoard.scss';
import boardsData from '../../helpers/data/boardsData';
import utilities from '../../helpers/utilities';

const importSwitchBoardModal = () => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardByUid(uid)
    .then((boards) => {
      let domString = '';
      domString += `
                <form>
                  <div class="form-group">
                  <label for="exampleFormControlSelect1">Select Board</label>
                  <select class="form-control" id="exampleFormControlSelect1">`;
      boards.forEach((board) => {
        domString += `<option value="${board.id}">${board.name}</option>`;
      });
      domString += `
              </select>
              </div>
              </form>
                    `;
      utilities.printToDom('switch-board-div', domString);
    })
    .catch();
};

export default { importSwitchBoardModal };
