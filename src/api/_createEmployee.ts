import type { UserFormValues } from '#domain/ColombusLogistics/Admin/SuperAdmin/SuperAdminRoleCreationForm';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const createEmployee = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<string, UserFormValues>({
  query: (request: Partial<UserFormValues>) => ({
    method: 'POST',
    url: '/admin/createEmployee',
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
