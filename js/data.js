import {PHOTOS_COUNT, AvatarId, CommentsCount, SentencesCount, LikesCount, DESCRIPTIONS, COMMENTS, NAMES} from './variables.js';
import {shuffle, getRandomNumberFromInterval} from './utils.js';

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

const getPhotos = () => Array.from({length: PHOTOS_COUNT}, getPhotoData);

export {getPhotos};
