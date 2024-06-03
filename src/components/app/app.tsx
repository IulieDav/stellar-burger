import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredienceSlice';

const App = () => {
  const location = useLocation();
  const background = location.state?.backgtound;
  const closeOrderModal = () => {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
