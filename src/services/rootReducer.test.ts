import { rootReducer } from './rootReducer';
import { ingredientsReducer } from './slices/ingredienceSlice';
import { userReducer } from './slices/userSlice';
import { orderReducer } from './slices/orderSlice';
import { constructorReducer } from './slices/constructorSlice';

describe('rootReducer', () => {
  it('should return the initial state with init action', () => {
    const initAction = { type: '@INIT' };
    const initialState = rootReducer(undefined, initAction);
    expect(initialState).toEqual({
      ingredients: ingredientsReducer(undefined, initAction),
      user: userReducer(undefined, initAction),
      orders: orderReducer(undefined, initAction),
      burgerConstructor: constructorReducer(undefined, initAction)
    });
  });
  it('should return the initial state with unknown action', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, fakeAction);
    expect(initialState).toEqual({
      ingredients: ingredientsReducer(undefined, fakeAction),
      user: userReducer(undefined, fakeAction),
      orders: orderReducer(undefined, fakeAction),
      burgerConstructor: constructorReducer(undefined, fakeAction)
    });
  });
});
