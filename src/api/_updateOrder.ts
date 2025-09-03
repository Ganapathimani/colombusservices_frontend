import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const updateOrder = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<
TLogisticsRegistrationForm,
{ orderId: string; data: Partial<TLogisticsRegistrationForm> }
>({
  query: ({ orderId, data }) => ({
    url: `/orders/updateOrder/${orderId}`,
    method: 'PUT',
    body: data,
  }),
  transformResponse: (res: any) => res as TLogisticsRegistrationForm,
  invalidatesTags: (_res, _error, { orderId }) => [
    { type: 'Orders', id: 'all' },
    { type: 'Orders' as ColombusLogisticsTagType, id: orderId },
  ],
});

export default updateOrder;
