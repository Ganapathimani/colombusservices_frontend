import type { TEnquiry } from '#domain/models/TEnquiry';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const listEnquiry = (
  builder: ColombusLogisticsBuilder,
) => builder.query<TEnquiry[], void>({
  query: () => '/enquiry',
  transformResponse: (it: any) => it.data,
  providesTags: () => [
    {
      type: 'Enquiries' as ColombusLogisticsTagType,
      id: 'all',
    },
  ],
});

export default listEnquiry;
