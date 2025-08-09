import { configureStore } from '@reduxjs/toolkit';
import set from 'lodash/set';
import app from '#domain/app/reducers';
import colombusLogisticsApi from '#api/colombusLogisticsApi';

const store = configureStore({
  reducer: {
    app: app.reducer,
    [colombusLogisticsApi.reducerPath]: colombusLogisticsApi.reducer,
  },
  middleware: (gdm) => gdm({ serializableCheck: false }).concat(colombusLogisticsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

set(window, 'EventCalendar.store', store);
