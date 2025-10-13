import type { StaffFormValues } from '#domain/ColombusLogistics/Admin/admin/CreateStaffUsers';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const createStaff = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<string, StaffFormValues>({
  query: (request: Partial<StaffFormValues>) => ({
    method: 'POST',
    url: '/admin/staff',
    body: request,
  }),
  transformResponse: (it: any) => it,
  invalidatesTags: (res: any) => [
    {
      type: 'Staff',
      id: 'all',
    },
    {
      type: 'Staff' as ColombusLogisticsTagType,
      id: res,
    },
  ],
});

export default createStaff;
