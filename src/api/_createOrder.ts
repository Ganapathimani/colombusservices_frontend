import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const orderUpsert = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<string, TLogisticsRegistrationForm>({
  query: (request: Partial<TLogisticsRegistrationForm>) => ({
    method: 'POST',
    url: '/orders/myOrders',
    body: request,
  }),
  transformResponse: (it: any) => it,
  invalidatesTags: (res: any) => [
    {
      type: 'Orders',
      id: 'all',
    },
    {
      type: 'Orders' as ColombusLogisticsTagType,
      id: res,
    },
  ],
});

export default orderUpsert;
