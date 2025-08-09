import { configureStore } from '@reduxjs/toolkit';
import set from 'lodash/set';
import app from '#domain/app/reducers';
import colombusLogisticsAdminApi from '#api/colombusLogisticsAdminApi';

const store = configureStore({
  reducer: {
    app: app.reducer,
    [colombusLogisticsAdminApi.reducerPath]: colombusLogisticsAdminApi.reducer,
  },
  middleware: (gdm) => gdm({ serializableCheck: false }).concat(colombusLogisticsAdminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

set(window, 'EventCalendar.store', store);
