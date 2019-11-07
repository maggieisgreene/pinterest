import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import allBoards from '../../components/AllBoards/allBoards';

const logoutNavbar = $('#navbar-button-logout');
const authDiv = $('#auth');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      allBoards.printBoards(user.uid);
    } else {
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
