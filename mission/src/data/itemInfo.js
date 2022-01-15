const ITEMINFOS = [
  {
    id: 1,
    author: {
      id: 1,
      email: 'string',
      tag: '#지갑 #잡화',
      nickname: '지갑전문',
      profileImageUrl: 'null',
      address: 'string',
    },
    mainImageUrl: 'https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png',
    title: '남성용 반지갑',
    content: '<div class="content" style="text-align:left; margin-left:20px;">호불호 없는 지갑입니다.</div> <img src="https://user-images.githubusercontent.com/66211721/149165422-61d20204-8e39-49da-a248-0e1b6bed1e3d.png" alt="contentImg"  style="width:100%; height:100%; max-width: 375px; max-height: 375px;"/>',
    contentImageUrl: 'https://user-images.githubusercontent.com/66211721/149165422-61d20204-8e39-49da-a248-0e1b6bed1e3d.png',
    quantity: 5,
    price: '36,500',
    createdDate: '2022-01-10T15:01:30',
    modifiedDate: '2021-01-10T15:01:30',
    likeCount: 0,
    viewCount: 1,
    isLiked: false,
    isDiscount: true,
    discountRate: 30, // isDiscount가 false면 null
    discountPrice: '10,950', // isDiscount가 false면 null
    priceToBuy: '25,550', // isDiscount가 false면 null
  },
];

export default ITEMINFOS;
