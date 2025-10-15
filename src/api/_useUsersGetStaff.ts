import type { TAdminUser } from '#domain/models/TAdminUser';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

export type UserGetProps = {
  id: string;
};

const getStaffUser = (
  builder: ColombusLogisticsBuilder,
) => builder.query<TAdminUser, UserGetProps>({
  query: ({ id }) => `/admin/staff/${id}`,
  transformResponse: (response: any) => response.staff,
  providesTags: (result, error, { id }) => [
    {
      type: 'Staff' as ColombusLogisticsTagType,
      id: 'all',
    },
    {
      type: 'Staff' as ColombusLogisticsTagType,
      id,
    },
  ],
});

export default getStaffUser;
