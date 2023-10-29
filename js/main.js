const getRandomNumberFromInterval = (min, max)=> Math.floor(Math.random() * (max - min + 1) + min);

const photoCounts = 25;

const DESCRIPTIONS = [
  'Это моя семья',
  'Как вам?',
  'Оцените!',
  'Я с друзьями',
  'Что скажите?',
  'Мы на прогулке'
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = ['Артём', 'Леша', 'Семен', 'Саша', 'Лиза', 'Даша',];

const avatarId = {min: 1, max: 6,};

const commentsCount = {min: 0, max: 30,};

const sentencesCount = {min: 1, max: 2,};

const likesCount = {min: 15, max: 200,};

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const getComment = (_, id) => ({
  id,
  avatar: `img/avatar-${getRandomNumberFromInterval(
    avatarId.min,
    avatarId.max
  )}.svg`,
  message: shuffle(COMMENTS).slice(0, getRandomNumberFromInterval(
    sentencesCount.min,
    sentencesCount.max
  )),
  name: NAMES[getRandomNumberFromInterval(0, NAMES.length - 1)],
});

const getPhotoData = (_, id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomNumberFromInterval(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumberFromInterval(
    likesCount.min,
    likesCount.max
  ),
  coments: Array.from({length: getRandomNumberFromInterval(
    commentsCount.min,
    commentsCount.max
  )}, (getComment)),
});

const getPhotos = () => Array.from({length: photoCounts}, getPhotoData);

getPhotos();
