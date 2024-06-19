import {
  constructorReducer,
  ConstructorState,
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp
} from './constructorSlice';
import { nanoid } from '@reduxjs/toolkit';

describe('constructorSlice', () => {
  const initialState: ConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    isLoading: false,
    error: null
  };

  const testIngredient = {
    _id: '1',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 30,
    calories: 100,
    price: 200,
    image: 'test.jpg',
    image_large: 'test_large.jpg',
    image_mobile: 'test_mobile.jpg',
    id: '1'
  };

  const testIngredients = [
    {
      _id: '1',
      name: 'Test Ingredient 1',
      type: 'main',
      proteins: 20,
      fat: 10,
      carbohydrates: 30,
      calories: 100,
      price: 200,
      image: 'test1.jpg',
      image_large: 'test1_large.jpg',
      image_mobile: 'test1_mobile.jpg',
      id: nanoid()
    },
    {
      _id: '2',
      name: 'Test Ingredient 2',
      type: 'main',
      proteins: 20,
      fat: 10,
      carbohydrates: 30,
      calories: 100,
      price: 200,
      image: 'test2.jpg',
      image_large: 'test2_large.jpg',
      image_mobile: 'test2_mobile.jpg',
      id: nanoid()
    }
  ];

  it('should handle addIngredient', () => {
    const actualState = constructorReducer(
      initialState,
      addIngredient(testIngredient)
    );
    expect(actualState.constructorItems.ingredients.length).toBe(1);
    expect(actualState.constructorItems.ingredients[0]).toMatchObject({
      ...testIngredient,
      id: expect.any(String)
    });
  });

  it('should handle removeIngredient', () => {
    const testIngredient = {
        ...initialState.constructorItems.ingredients[0],
        id: nanoid()
      };

    const stateWithIngredient = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: [testIngredient]
        }
      };

      const actualState = constructorReducer(
        stateWithIngredient,
        removeIngredient(testIngredient)
      );

    expect(actualState.constructorItems.ingredients.length).toBe(0);
  });

  it('should handle moveIngredientUp', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [...testIngredients]
      }
    };

    const actualState = constructorReducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );

    expect(actualState.constructorItems.ingredients[0].id).toBe(testIngredients[1].id);
    expect(actualState.constructorItems.ingredients[1].id).toBe(testIngredients[0].id);
  });

  it('should handle moveIngredientDown', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [...testIngredients]
      }
    };

    const actualState = constructorReducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );

    expect(actualState.constructorItems.ingredients[0].id).toBe(testIngredients[1].id);
    expect(actualState.constructorItems.ingredients[1].id).toBe(testIngredients[0].id);
  });
});
