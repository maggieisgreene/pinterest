import './pinView.scss';

const printPinCards = (pin) => {
  let domString = '';
  domString += `
  <div class="card col-3 individual-pin" id="${pin.id}">
    <img src=${pin.imageUrl} class="card-img-top pinImg" alt="Image of ${pin.name}">
    <div class="card-body">
      <h5 class="card-title">${pin.name}</h5>
      <p>${pin.description}</p>
    </div>
  </div>
  `;
  return domString;
};

export default { printPinCards };
