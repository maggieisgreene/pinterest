import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const logoutButton = $('#navbar-button-logout');

const logoutEvent = () => {
  logoutButton.click((event) => {
    event.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        authDiv.classList.add('hide');
        logoutButton.classList.add('hide');
      })
      .catch((error) => console.error('you still logged in', error));
  });
};

export default { logoutEvent };
