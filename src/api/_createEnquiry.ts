import type { TEnquiry } from '#domain/models/TEnquiry';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const createEnquiry = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<string, TEnquiry>({
  query: (request: Partial<TEnquiry>) => ({
    method: 'POST',
    url: '/enquiry',
    body: request,
  }),
  transformResponse: (it: any) => it,
  invalidatesTags: (res: any) => [
    {
      type: 'Enquiries',
      id: 'all',
    },
    {
      type: 'Enquiries' as ColombusLogisticsTagType,
      id: res,
    },
  ],
});

export default createEnquiry;
