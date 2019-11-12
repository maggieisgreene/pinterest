import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPinByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const getPinById = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${id}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const updatePin = (pinId, updatedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, updatedPin);
const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);
const addNewPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

export default {
  getPinByBoardId,
  deletePin,
  addNewPin,
  getPinById,
  updatePin,
};
