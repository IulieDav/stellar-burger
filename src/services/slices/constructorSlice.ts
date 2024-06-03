import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

export interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.bun = action.payload;
    },

    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    selectConstructor: (state) => state.constructorItems
  }
});

export const { setBun, addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
export const { selectConstructor } = constructorSlice.selectors;
