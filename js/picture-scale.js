import {SCALE_STEP, ScaleValue} from './variables.js';

const bodyElement = document.querySelector('body');
const pictureUploadFormElement = document.querySelector('.img-upload__form');
const picturePreviewElement = pictureUploadFormElement.querySelector('.img-upload__preview img');
const smallerScaleButtonElement = bodyElement.querySelector('.scale__control--smaller');
const biggerScaleButtonElement = bodyElement.querySelector('.scale__control--bigger');
const scaleValueElement = bodyElement.querySelector('.scale__control--value');

const onSmallerScaleButtonElementClick = () => {
  let scaleValue = Number(scaleValueElement.value.slice(0, -1));
  if (scaleValue > ScaleValue.MIN) {
    scaleValue -= SCALE_STEP;
    scaleValueElement.value = `${scaleValue}%`;
    picturePreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

const onBiggerScaleButtonElementClick = () => {
  let scaleValue = Number(scaleValueElement.value.slice(0, -1));
  if (scaleValue < ScaleValue.MAX) {
    scaleValue += SCALE_STEP;
    scaleValueElement.value = `${scaleValue}%`;
    picturePreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

const initScaleControl = () => {
  scaleValueElement.value = `${ScaleValue.MAX}%`;
  smallerScaleButtonElement.addEventListener('click', onSmallerScaleButtonElementClick);
  biggerScaleButtonElement.addEventListener('click', onBiggerScaleButtonElementClick);
};

const stopScaleControl = () => {
  smallerScaleButtonElement.removeEventListener('click', onSmallerScaleButtonElementClick);
  biggerScaleButtonElement.removeEventListener('click', onBiggerScaleButtonElementClick);
  picturePreviewElement.style.transform = '';
};

export {initScaleControl, stopScaleControl};
