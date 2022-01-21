const NAVIGATIONDATA = [
  {
    id: 1,
    // eslint-disable-next-line global-require
    navImg: require('../assets/navigationHome.svg'),
    navText: '홈',
    RouterNav: 'home',
  },
  {
    id: 2,
    // eslint-disable-next-line global-require
    navImg: require('../assets/navigationHeart.svg'),
    navText: '찜',
    RouterNav: 'like',

  },
  {
    id: 3,
    // eslint-disable-next-line global-require
    navImg: require('../assets/navigationCart.svg'),
    navText: '장바구니',
    RouterNav: 'cart',
  },
  {
    id: 4,
    // eslint-disable-next-line global-require
    navImg: require('../assets/navigationMyprofile.svg'),
    navText: '마이 페이지',
    RouterNav: 'myPage',
  },
];

export default NAVIGATIONDATA;
