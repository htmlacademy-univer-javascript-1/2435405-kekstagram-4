const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const getRandomNumberFromInterval = (min, max)=> Math.floor(Math.random() * (max - min + 1) + min);

const isEscapeKey = (evt) => evt.key === 'Escape';

export {shuffle, getRandomNumberFromInterval, isEscapeKey};
