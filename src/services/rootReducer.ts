import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredienceSlice';
import { userReducer } from './slices/userSlice';
import { orderReducer } from './slices/orderSlice';
import { constructorReducer } from './slices/constructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  orders: orderReducer,
  burgerConstructor: constructorReducer
});
