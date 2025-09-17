import type { TBranch } from '#domain/models/TBranch';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const createBranch = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<string, TBranch>({
  query: (request: Partial<TBranch>) => ({
    method: 'POST',
    url: '/branch',
    body: request,
  }),
  transformResponse: (it: any) => it,
  invalidatesTags: (res: any) => [
    {
      type: 'Branches',
      id: 'all',
    },
    {
      type: 'Branches' as ColombusLogisticsTagType,
      id: res,
    },
  ],
});

export default createBranch;
