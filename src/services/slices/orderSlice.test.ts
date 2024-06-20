import {
  getFeeds,
  getOrders,
  createOrder,
  getOrderByNumber,
  orderReducer,
  initialState
} from './orderSlice';

describe('orderSlice', () => {
  it('should handle getFeeds pending', () => {
    const actualState = orderReducer({ ...initialState }, getFeeds.pending(''));
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });
  it('should handle getFeeds fulfilled', () => {
    const testData = {
      success: true,
      orders: [],
      total: 1,
      totalToday: 1
    };
    const actualState = orderReducer(
      { ...initialState },
      getFeeds.fulfilled(testData, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      feeds: testData.orders,
      total: testData.total,
      totalToday: testData.totalToday,
      isLoading: false
    });
  });
  it('should handle getFeeds rejected', () => {
    const testError = new Error('Error');
    const actualState = orderReducer(
      { ...initialState },
      getFeeds.rejected(testError, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: testError.message
    });
  });
  it('should handle getOrders pending', () => {
    const actualState = orderReducer(
      { ...initialState },
      getOrders.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });
  it('should handle getOrders fulfilled', () => {
    const testData = [
      {
        _id: '1',
        ingredients: ['1', '2'],
        status: 'done',
        name: 'Test Order',
        createdAt: '2021-08-10T10:00:00.000Z',
        updatedAt: '2021-08-10T10:00:00.000Z',
        number: 1
      }
    ];
    const actualState = orderReducer(
      { ...initialState },
      getOrders.fulfilled(testData, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      orders: testData,
      isLoading: false
    });
  });

  it('should handle getOrders rejected', () => {
    const testError = new Error('Error');
    const actualState = orderReducer(
      { ...initialState },
      getOrders.rejected(testError, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: testError.message
    });
  });

  it('should handle createOrder pending', () => {
    const actualState = orderReducer(
      { ...initialState },
      createOrder.pending('', [])
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle createOrder fulfilled', () => {
    const testData = {
      success: true,
      order: {
        _id: '1',
        ingredients: ['1', '2'],
        status: 'done',
        name: 'Test Order',
        createdAt: '2021-08-10T10:00:00.000Z',
        updatedAt: '2021-08-10T10:00:00.000Z',
        number: 1
      },
      name: 'Test Order'
    };
    const actualState = orderReducer(
      { ...initialState },
      createOrder.fulfilled(testData, '', [])
    );
    expect(actualState).toEqual({
      ...initialState,
      order: testData.order,
      isLoading: false
    });
  });

  it('should handle createOrder rejected', () => {
    const testError = new Error('Error');
    const actualState = orderReducer(
      { ...initialState },
      createOrder.rejected(testError, '', [])
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: testError.message
    });
  });

  it('should handle getOrderByNumber pending', () => {
    const actualState = orderReducer(
      { ...initialState },
      getOrderByNumber.pending('', 1)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle getOrderByNumber fulfilled', () => {
    const testData = {
      success: true,
      orders: [
        {
          _id: '1',
          ingredients: ['1', '2'],
          status: 'done',
          name: 'Test Order',
          createdAt: '2021-08-10T10:00:00.000Z',
          updatedAt: '2021-08-10T10:00:00.000Z',
          number: 1
        }
      ]
    };
    const actualState = orderReducer(
      { ...initialState },
      getOrderByNumber.fulfilled(testData, '', 1)
    );
    expect(actualState).toEqual({
      ...initialState,
      orders: testData.orders,
      isLoading: false
    });
  });

  it('should handle getOrderByNumber rejected', () => {
    const testError = new Error('Error');
    const actualState = orderReducer(
      { ...initialState },
      getOrderByNumber.rejected(testError, '', 1)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      error: testError.message
    });
  });
});
