import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const getOrder = (
  builder: ColombusLogisticsBuilder,
) => builder.query<TLogisticsRegistrationForm, string>({
  query: (orderId) => `/orders/${orderId}`,
  transformResponse: (it: any) => it.order,
  providesTags: (result, error, orderId) => [
    {
      type: 'Orders' as ColombusLogisticsTagType,
      id: orderId,
    },
  ],
});

export default getOrder;
