const PhotoCounts = 25;

const AvatarId = {MIN: 1, MAX: 6,};

const CommentsCount = {MIN: 0, MAX: 30,};

const SentencesCount = {MIN: 1, MAX: 2,};

const LikesCount = {MIN: 15, MAX: 200,};

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

const getPhotos = () => Array.from({length: PhotoCounts}, getPhotoData);

getPhotos();
