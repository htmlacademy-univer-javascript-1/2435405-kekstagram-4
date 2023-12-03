import {AvatarId, CommentsCount, SentencesCount, LikesCount, DESCRIPTIONS, COMMENTS, NAMES} from './variables.js';

const getRandomNumberFromInterval = (min, max)=> Math.floor(Math.random() * (max - min + 1) + min);

const shuffle = (array) => array.sort(() => Math.random() - 0.5);


const getComment = (_, id) => ({
  id: id + 1,
  avatar: `img/avatar-${getRandomNumberFromInterval(
    AvatarId.MIN,
    AvatarId.MAX
  )}.svg`,
  message: shuffle(COMMENTS).slice(0, getRandomNumberFromInterval(
    SentencesCount.MIN,
    SentencesCount.MAX
  )),
  name: NAMES[getRandomNumberFromInterval(0, NAMES.length - 1)],
});


const getPhotoData = (_, id) => ({
  id: id + 1,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomNumberFromInterval(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumberFromInterval(
    LikesCount.MIN,
    LikesCount.MAX
  ),
  coments: Array.from({length: getRandomNumberFromInterval(
    CommentsCount.MIN,
    CommentsCount.MAX
  )}, (getComment)),
});

const getPhotos = () => Array.from({length}, getPhotoData);

export {getPhotos};
