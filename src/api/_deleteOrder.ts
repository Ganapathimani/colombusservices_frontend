import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const deleteOrder = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<{ message: string }, string>({
  query: (orderId: string) => ({
    url: `/orders/${orderId}`,
    method: 'DELETE',
  }),
  transformResponse: (res: any) => res,
  invalidatesTags: (res: any, error, orderId) => [
    {
      type: 'Orders',
      id: 'all',
    },
    {
      type: 'Orders' as ColombusLogisticsTagType,
      id: orderId,
    },
  ],
});

export default deleteOrder;
