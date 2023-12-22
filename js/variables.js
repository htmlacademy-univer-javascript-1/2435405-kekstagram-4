const PHOTOS_COUNT = 25;

const COMMENTS_SHOWN_STEP = 5;

const MAX_HASHTAG_COUNT = 5;

const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const MAX_HASHTAG_LENGTH = 20;

const MAX_COMMENT_LENGTH = 140;

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

export {PHOTOS_COUNT, COMMENTS_SHOWN_STEP, MAX_HASHTAG_COUNT, HASTAG_REGEX, MAX_HASHTAG_LENGTH, MAX_COMMENT_LENGTH, AvatarId, CommentsCount, SentencesCount, LikesCount, DESCRIPTIONS, COMMENTS, NAMES};
