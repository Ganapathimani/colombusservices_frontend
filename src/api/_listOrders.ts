import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const listOrders = (
  builder: ColombusLogisticsBuilder,
) => builder.query<TLogisticsRegistrationForm, void>({
  query: () => '/orders',
  transformResponse: (it: any) => it.orders,
  providesTags: () => [
    {
      type: 'Orders' as ColombusLogisticsTagType,
      id: 'all',
    },
  ],
});

export default listOrders;
