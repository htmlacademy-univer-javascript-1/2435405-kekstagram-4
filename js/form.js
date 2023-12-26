import {isEscapeKey, isRightString} from './utils.js';
import {MAX_HASHTAG_COUNT, HASTAG_REGEX, MAX_HASHTAG_LENGTH, MAX_COMMENT_LENGTH, VALID_IMAGE_TYPES} from './variables.js';
import {initScaleControl, stopScaleControl} from './picture-scale.js';

const bodyElement = document.querySelector('body');
const picrtureUploadButtonElement = document.querySelector('#upload-file');
const cancelButtonElement = document.querySelector('#upload-cancel');
const pictureUploadFormElement = document.querySelector('.img-upload__form');
const pictureUploadOverlayElement = document.querySelector('.img-upload__overlay');
const hashtagsFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const pictureUploadElement = pictureUploadFormElement.querySelector('.img-upload__input');

const isCorrectComment = (comment) => isRightString(comment, MAX_COMMENT_LENGTH);

const isCorrectHashtags = () =>{
  let isСorrectTag = true;

  const hashtagsArray = hashtagsFieldElement.value.split(' ').map((hashtag) => {
    hashtag = hashtag.toLowerCase();

    if(!HASTAG_REGEX.test(hashtag) || (!isRightString(hashtag, MAX_HASHTAG_LENGTH))) {
      isСorrectTag = false;
    }
    return hashtag;
  });
  const uniqueTags = new Set(hashtagsArray);

  return (isСorrectTag && uniqueTags.size === hashtagsArray.length && hashtagsArray.length <= MAX_HASHTAG_COUNT) || hashtagsFieldElement.value === '';
};

const isPicture = (file) => VALID_IMAGE_TYPES.includes(file);

const pristine = new Pristine (pictureUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-text',
});

const onDocumentKeydown  = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== hashtagsFieldElement
  && document.activeElement !== commentFieldElement) {
    evt.preventDefault();
    closePopupEditForm();
  }
};

const onCancelButtonClick = () => {
  closePopupEditForm();
};

function closePopupEditForm () {
  bodyElement.classList.remove('modal-open');
  pictureUploadOverlayElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown );
  pictureUploadElement.value = '';

  stopScaleControl();
  pristine.reset();
}

const initValidateForm = () => {
  pristine.addValidator(hashtagsFieldElement, isCorrectHashtags, `Введите не более ${MAX_HASHTAG_COUNT} уникальных хештегов, длиной не более ${MAX_HASHTAG_LENGTH} символов`);
  pristine.addValidator(commentFieldElement, isCorrectComment, `Введите комментарий не более ${MAX_COMMENT_LENGTH} символов`);

  return pristine.validate();
};

const renderPopupEditForm = () => {
  if(isPicture(picrtureUploadButtonElement.files[0].type)) {
    pictureUploadOverlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    initScaleControl();
    initValidateForm();

    cancelButtonElement.addEventListener('click', onCancelButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const initEditPopup = () => {
  pictureUploadElement.addEventListener('change', renderPopupEditForm);
};

export {initEditPopup};
