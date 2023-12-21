import {isEscapeKey} from './utils.js';
import {COMMENTS_SHOWN_STEP} from './variables.js';

const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsElement = commentsList.querySelector('.social__comment');
const totalComments = document.querySelector('.comments-count');
const commentsShown = document.querySelector('.comments-shown');
const commentsLoadButton = bigPicture.querySelector('.comments-loader');

const createComment = ( {avatar, name, message} ) => {
  const comment = commentsElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

let renderedComments = 0;
let comments = null;

const renderComments = () => {
  commentsList.innerHTML = '';

  renderedComments += COMMENTS_SHOWN_STEP;
  if (renderedComments >= comments.length) {
    renderedComments = comments.length;
    commentsLoadButton.classList.add('hidden');
  }
  else {
    commentsLoadButton.classList.remove('hidden');
  }

  comments.slice(0, renderedComments).forEach((comment) => {
    const newComment = createComment(comment);
    commentsList.appendChild(newComment);
  });
  commentsShown.textContent = renderedComments;
  totalComments.textContent = comments.length;
};

const onLoadCommentsButtonClick = () => {
  renderComments();
};

const closePopup = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click',onCloseButtonClick);
  commentsLoadButton.classList.remove('hidden');
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
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
};

const renderBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  commentsLoadButton.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCloseButtonClick);
  commentsLoadButton.addEventListener('click', onLoadCommentsButtonClick);

  renderPictureData(picture);
  comments = picture.comments.slice();
  renderComments(comments);
};

export {renderBigPicture};
