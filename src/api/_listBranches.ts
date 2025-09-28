import type { TBranch } from '#domain/models/TBranch';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const listBranches = (
  builder: ColombusLogisticsBuilder,
) => builder.query<TBranch[], void>({
  query: () => '/superadmin/branches',
  transformResponse: (it: any) => it.branches,
  providesTags: () => [
    {
      type: 'Branches' as ColombusLogisticsTagType,
      id: 'all',
    },
  ],
});

export default listBranches;
