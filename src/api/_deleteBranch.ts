import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const deleteBranch = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<{ message: string }, string>({
  query: (branchId: string) => ({
    url: `/branches/${branchId}`,
    method: 'DELETE',
  }),
  transformResponse: (res: any) => res,
  invalidatesTags: (res: any, error, branchId) => [
    {
      type: 'Branches',
      id: 'all',
    },
    {
      type: 'Branches' as ColombusLogisticsTagType,
      id: branchId,
    },
  ],
});

export default deleteBranch;
