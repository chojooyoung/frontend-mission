import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ItemInfoPage from '@/views/ItemInfo.vue';
import itemInfo from '@/data/itemInfo';
import Like from '@/components/LikeButton.vue';
import itemGet from '@/api/repositories/ItemRepository';

describe('ItemInfoPage', () => {
  let wrapper;

  beforeEach(() => {
    const res = {
      data: {
        item: {
          product_no: 'asdf1234',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          original_price: 298000,
          description: '<div><p><strong>체형에 관계없이 누구에게나 맞는 수트!</strong></p> <img style="width: 100%;" src="https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-2.png"/> <p>연말 송년회에 아주 어울릴 수트 판매합니다!</p></div>',
          seller: {
            seller_no: 1,
            name: '대한양복',
            hash_tags: [
              '남성',
              '수트',
            ],
            profile_image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/sellers/seller.png',
          },
          reviews: [
            {
              review_no: 1,
              writer: 'lk***',
              title: '만족해요',
              content: '핏이 아주 잘 맞습니다. 대만족!',
              likes_count: 7,
              created: '2021. 12. 04',
              img: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/example.jpg',
            },
          ],
        },
      },
    };

    const store = createStore({
      namespaced: true,
      state() { // 함수로 반환 왜? 데이터기 때문에.
        return {
          cartLists: [],
          isPutItemCart: '',
        };
      },
      getters: {
        getCartList(state) {
          return state.cartLists;
        },
        getisPutItemCart(state) {
          return state.isPutItemCart;
        },

      },
      mutations: { // 데이터를 수정하는 권한
        addToCartList(state, addItemObject) {
          state.cartLists.push(addItemObject);
        },
        deleteCartList(state, deleteItemObject) {
          const arr = state.cartLists.filter(
            (item) => item.product_no !== deleteItemObject.product_no,
          );
          state.cartLists = arr;
        },
        changeCartListState(state) {
          state.isPutItemCart = !state.isPutItemCart;
        },
      },
    });
    itemGet.getItem = jest.fn().mockResolvedValue(res);
    wrapper = mount(ItemInfoPage, {
      global: {
        plugins: [store],
      },
    });
  });

  it('store mutation test', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });
    const testText = '상품이 장바구니에 추가 하였습니다.';
    await itemGet.getItem();
    await wrapper.find('[data-test="itemInfo-store-discarted"]').trigger('click');
    setTimeout(() => {
      expect(wrapper.find('[data-test="itemInfo-store-iscarted"]').exists()).toBe(true);
    }, 200);
    expect(window.alert).toBeCalledWith(testText);
  });

  it('api repository call test', () => {
    expect(itemGet.getItem).toHaveBeenCalledTimes(1);
  });

  it('api repository data test', () => {
    const res = {
      data: {
        item: {
          product_no: 'asdf1234',
          name: '핏이 좋은 수트',
          image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
          price: 198000,
          original_price: 298000,
          description: '<div><p><strong>체형에 관계없이 누구에게나 맞는 수트!</strong></p> <img style="width: 100%;" src="https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-2.png"/> <p>연말 송년회에 아주 어울릴 수트 판매합니다!</p></div>',
          seller: {
            seller_no: 1,
            name: '대한양복',
            hash_tags: [
              '남성',
              '수트',
            ],
            profile_image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/sellers/seller.png',
          },
          reviews: [
            {
              review_no: 1,
              writer: 'lk***',
              title: '만족해요',
              content: '핏이 아주 잘 맞습니다. 대만족!',
              likes_count: 7,
              created: '2021. 12. 04',
              img: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/example.jpg',
            },
          ],
        },
      },
    };
    itemGet.getItem().then((data) => {
      expect(data).toEqual(res);
    });
  });

  it('redners ItemInfoPage', () => {
    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });

  it('has mainimage in ItemInfoPage', () => {
    expect(wrapper.find('.info-main_img').exists()).toBe(true);
  });

  it('renders and viding data an item-imgae', async () => {
    await wrapper.setData({
      itemInfo:
      {
        image: 'https://user-images.githubusercontent.com/66211721/149165057-fec02ae9-e0a4-4690-93f8-17328de38ab7.png',
      },
    });
    expect(wrapper.find('.info-main_img').attributes().src).toEqual(itemInfo[0].mainImageUrl);
  });

  it('change like imgage at a time per like button click', async () => {
    const likeWrapper = mount(Like);
    await likeWrapper.find('.userDislikePost').trigger('click');
    expect(likeWrapper.find('.userDislikePost').exists()).toBe(true);
  });

  it('checks seller default profileimg rendering', async () => {
    await wrapper.setData({ author: { image: 'null' } });
    expect(wrapper.find('.info-seller-defaultImg').exists()).toBe(false);
    expect(wrapper.find('.info-seller-profileImg').exists()).toBe(true);
  });

  it('renders and viding data an seller-info', async () => {
    await wrapper.setData({
      itemInfo: {
        seller: {
          name: '지갑전문',
        },
      },
    });
    expect(wrapper.find('.info-seller-subinfo-name').text()).toEqual('지갑전문');
  });

  it('renders and viding data an item-info', async () => {
    await wrapper.setData({
      itemInfo: {
        name: '지갑',
        description: '<div class="content" style="text-align:left; margin-left:20px;">호불호 없는 지갑입니다.</div>',
      },
    });
    expect(wrapper.find('.info-item-title').text()).toEqual('지갑');
    expect(wrapper.find('.content').text()).toEqual('호불호 없는 지갑입니다.');
  });
});
