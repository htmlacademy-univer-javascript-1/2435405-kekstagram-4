const photos = [];

const photoDescrpiptionsVariants =
['Это моя семья',
  'Как вам?',
  'Оцените!',
  'Я с друзьями',
  'Что скажите?',
  'Мы на прогулке'];
const commentVariants =
['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const nameVariants =
['Артём',
  'Леша',
  'Семен',
  'Саша',
  'Лиза',
  'Даша',];

const getRandomNumber = (min, max)=> Math.floor(Math.random() * (max - min + 1) + min);

const getComments = () => {
  const comments = [];
  const commentsNumber = getRandomNumber(0,30);
  for (let i = 1; i <= commentsNumber; i++) {
    const comment = { id: i, avatar: `img/avatar-${getRandomNumber(1,6)}.svg`, message: commentVariants[getRandomNumber(0,5)], name: nameVariants[getRandomNumber(0,5)]};
    comments.push(comment);
  }
  return comments;
};

for (let i = 1; i <= 25; i++) {
  const photo = { id: i, url: `photos/${i}.jpg`, description: photoDescrpiptionsVariants[getRandomNumber(0,5)], likes: getRandomNumber(15,200), coments: getComments()};
  photos.push(photo);
}

