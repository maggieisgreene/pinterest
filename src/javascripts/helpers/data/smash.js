import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from './boardsData';
import pinsData from './pinsData';

const getPinByBoardIdWithBoardName = (boardId) => new Promise((resolve, reject) => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardByUid(uid)
    .then((boards) => {
      pinsData.getPinByBoardId(boardId)
        .then((pins) => {
          const newPins = [];
          pins.forEach((pin) => {
            const newPin = { ...pin };
            const getPinBoard = boards.find((x) => x.id === newPin.boardId);
            if (getPinBoard) {
              newPin.boardName = getPinBoard.name;
            }
            newPins.push(newPin);
          });
          console.error(newPins);
          resolve(newPins);
        });
    })
    .catch((error) => reject(error));
});

export default { getPinByBoardIdWithBoardName };
