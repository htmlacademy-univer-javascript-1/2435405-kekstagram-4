import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentsElement = commentsList.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsloadButton = bigPicture.querySelector('.comments-loader');

const createComment = ( {avatar, name, message} ) => {
  const comment = commentsElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.social__comments').insertAdjacentHTML('afterbegin', comments.map((comment) => createComment(comment.avatar, comment.name, comment.message)).join(''));
};

const closePopup = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click',onCloseButtonClick);
};

function onCloseButtonClick () {
  closePopup();
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

const renderPictureData = ( { url, likes, description} ) => {
  bigPicture.querySelector('.big-picture__img').querySelector().src = url;
  bigPicture.querySelector('.big-picture__img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const renderBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentsloadButton.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCloseButtonClick);

  renderPictureData(picture);
  renderComments(picture.comments);
};

export {renderBigPicture};
