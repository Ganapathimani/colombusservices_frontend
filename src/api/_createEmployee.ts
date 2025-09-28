import type { AdminFormValues } from '#domain/ColombusLogistics/Admin/SuperAdmin/CreateAdminForm';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const createEmployee = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<string, AdminFormValues>({
  query: (request: Partial<AdminFormValues>) => ({
    method: 'POST',
    url: '/superadmin/users',
    body: request,
  }),
  transformResponse: (it: any) => it,
  invalidatesTags: (res: any) => [
    {
      type: 'Employees',
      id: 'all',
    },
    {
      type: 'Employees' as ColombusLogisticsTagType,
      id: res,
    },
  ],
});

export default createEmployee;
