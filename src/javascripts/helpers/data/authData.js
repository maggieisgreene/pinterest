import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const logoutNavbar = $('#navbar-button-logout');
const authDiv = $('#auth');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
