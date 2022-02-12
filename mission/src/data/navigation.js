const NAVIGATIONDATA = [
  {
    id: 1,
    // eslint-disable-next-line global-require
    navImg: require('../assets/navigationHome.svg'),
    navText: '홈',
    RouterNav: '',
  },
  {
    id: 2,
    // eslint-disable-next-line global-require
    navImg: require('../assets/navigationHeart.svg'),
    navText: '찜',
    RouterNav: 'WishList',

  },
  {
    id: 3,
    // eslint-disable-next-line global-require
    navImg: require('../assets/navigationCart.svg'),
    navText: '장바구니',
    RouterNav: 'CartList',
  },
  {
    id: 4,
    // eslint-disable-next-line global-require
    navImg: require('../assets/navigationMyprofile.svg'),
    navText: '마이 페이지',
    RouterNav: 'MyPage',
  },
];

export default NAVIGATIONDATA;
