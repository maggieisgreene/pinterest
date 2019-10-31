import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import buttonImg from './google-signin-tight.png';
import utilities from '../../helpers/utilities';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<button>
  <img src="${buttonImg}"></img>
  </button>`;
  utilities.printToDom('auth', domString);
  $('#googlesuth').click(signMeIn);
};

export default { loginButton, signMeIn };
