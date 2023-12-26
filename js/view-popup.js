import {isEscapeKey} from './utils.js';
import {COMMENTS_SHOWN_STEP} from './variables.js';

const bigPictureElement = document.querySelector('.big-picture');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentElement = commentsListElement.querySelector('.social__comment');
const totalCommentsElement = document.querySelector('.comments-count');
const commentsShownElement = document.querySelector('.comments-shown');
const commentsLoadButtonElement = bigPictureElement.querySelector('.comments-loader');

const createComment = ( {avatar, name, message} ) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

let renderedComments = 0;
let comments = null;

const renderComments = () => {
  commentsListElement.innerHTML = '';

  renderedComments += COMMENTS_SHOWN_STEP;
  if (renderedComments >= comments.length) {
    renderedComments = comments.length;
    commentsLoadButtonElement.classList.add('hidden');
  }
  else {
    commentsLoadButtonElement.classList.remove('hidden');
  }

  comments.slice(0, renderedComments).forEach((comment) => {
    const newComment = createComment(comment);
    commentsListElement.appendChild(newComment);
  });
  commentsShownElement.textContent = renderedComments;
  totalCommentsElement.textContent = comments.length;
};

const onLoadCommentsButtonClick = () => {
  renderComments();
};

const closePopup = () => {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click',onCloseButtonClick);
  commentsLoadButtonElement.classList.remove('hidden');
  renderedComments = 0;
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

const renderPictureData = (picture) => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
};

const renderBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  commentsLoadButtonElement.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCloseButtonClick);
  commentsLoadButtonElement.addEventListener('click', onLoadCommentsButtonClick);

  renderPictureData(picture);
  comments = picture.comments.slice();
  renderComments(comments);
};

export {renderBigPicture};
