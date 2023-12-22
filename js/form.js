import {isEscapeKey, isRightString} from './utils.js';
import {MAX_HASHTAG_COUNT, HASTAG_REGEX, MAX_HASHTAG_LENGTH, MAX_COMMENT_LENGTH, SCALE_STEP, ScaleValue} from './variables.js';

const VALID_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const imageUploadButton = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const imageOverlay = document.querySelector('.img-upload__overlay');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const picturePreview = uploadForm.querySelector('.img-upload__preview img');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');


const isCorrectComment = (comment) => isRightString(comment, MAX_COMMENT_LENGTH);

const isCorrectHashtags = () =>{
  let isСorrectTag = true;

  const hashtagsArray = hashtagsField.value.split(' ').map((hashtag) => {
    hashtag = hashtag.toLowerCase();

    if(!HASTAG_REGEX.test(hashtag) || (!isRightString(hashtag, MAX_HASHTAG_LENGTH))) {
      isСorrectTag = false;
    }
    return hashtag;
  });
  const uniqueTags = new Set(hashtagsArray);

  return (isСorrectTag && uniqueTags.size === hashtagsArray.length && hashtagsArray.length <= MAX_HASHTAG_COUNT) || hashtagsField.value === '';
};

const isPicture = () => {
  const fileType = imageUploadButton.files[0].type;

  return VALID_IMAGE_TYPES.some((type) => type === fileType);
};

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-text',
});

const onDocumentKeydown  = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== hashtagsField
  && document.activeElement !== commentField) {
    evt.preventDefault();
    closeForm();
  }
};

const onCancelButtonClick = () => {
  closeForm();
};

const onBiggerClick = () => {
  let scaleValue = Number(scaleControlValue.value.slice(0, -1));
  if (scaleValue < ScaleValue.MAX) {
    scaleValue += SCALE_STEP;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${scaleValue * 0.01})`;
  }
};

const onSmallerCLick = () => {
  let scaleValue = Number(scaleControlValue.value.slice(0, -1));
  if (scaleValue > ScaleValue.MAX) {
    scaleValue -= SCALE_STEP;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${scaleValue * 0.01})`;
  }
};

const closeScaleControl = () => {
  scaleControlSmaller.removeEventListener('click', onSmallerCLick);
  scaleControlBigger.removeEventListener('click', onBiggerClick);
  picturePreview.style.transform = '';
};

const initScaleControl = () => {
  scaleControlValue.value = `${ScaleValue.MAX}%`;
  scaleControlSmaller.addEventListener('click', onSmallerCLick);
  scaleControlBigger.addEventListener('click', onBiggerClick);
};

const openForm = () => {
  if(!isPicture()) {return;}
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  scaleControlBigger.addEventListener('click', onBiggerClick);
  scaleControlSmaller.addEventListener('click', onSmallerCLick);
  initScaleControl();
};

function closeForm () {
  document.body.classList.remove('modal-open');
  imageOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown );
  scaleControlBigger.removeEventListener('click', onBiggerClick);
  scaleControlSmaller.removeEventListener('click', onSmallerCLick);
  closeScaleControl();
  pristine.reset();
}


const initValidateForm = () => {
  pristine.addValidator(hashtagsField, isCorrectHashtags, `Введите не более ${MAX_HASHTAG_COUNT} уникальных хештегов, длиной не более ${MAX_HASHTAG_LENGTH} символов`);
  pristine.addValidator(commentField, isCorrectComment, `Введите комментарий не более ${MAX_COMMENT_LENGTH} символов`);

  return pristine.validate();
};

const renderUploadForm = () => {
  imageUploadButton.addEventListener('change', openForm);

  uploadForm.addEventListener('submit', (evt) => {
    if (!initValidateForm()) {
      initScaleControl();
      evt.preventDefault();
    }
  });
};

export {renderUploadForm};
