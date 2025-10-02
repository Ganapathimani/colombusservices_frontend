import type { TEnquiry } from '#domain/models/TEnquiry';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const updateEnquiry = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<TEnquiry, { id: string; data: Partial<TEnquiry> }>({
  query: ({ id, data }) => ({
    url: `enquiry/${id}`,
    method: 'PUT',
    body: data,
  }),
  transformResponse: (res: any) => res as TEnquiry,
  invalidatesTags: (_res, _error, { id }) => [
    {
      type: 'Enquiries',
      id: 'all',
    },
    {
      type: 'Enquiries' as ColombusLogisticsTagType,
      id,
    },
  ],
});

export default updateEnquiry;
