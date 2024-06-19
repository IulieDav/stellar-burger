import {
  getIngredients,
  ingredientsReducer,
  IngredientState
} from './ingredienceSlice';

describe('ingredientSlice', () => {
  const initialState: IngredientState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('should handle getIngredients pending', () => {
    const actualState = ingredientsReducer(
      { ...initialState },
      getIngredients.pending('')
    );
    expect(actualState).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  it('should handle getIngredients fulfilled', () => {
    const testData = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
      }
    ];
    const actualState = ingredientsReducer(
      { ...initialState },
      getIngredients.fulfilled(testData, '')
    );
    expect(actualState).toEqual({
      ingredients: testData,
      isLoading: false,
      error: null
    });
  });
  it('should handle getIngredients rejected', () => {
    const testError = new Error('Error')
    const actualState = ingredientsReducer(
      { ...initialState },
      getIngredients.rejected(testError,'')
    );
    expect(actualState).toEqual({
      ingredients: [],
      isLoading: false,
      error: testError.message
    });
  });
});
