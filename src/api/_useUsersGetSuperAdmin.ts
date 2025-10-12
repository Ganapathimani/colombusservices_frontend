import type { TAdminUser } from '#domain/models/TAdminUser';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

export type UserGetProps = {
  id: string;
};

const getSuperAdminUser = (
  builder: ColombusLogisticsBuilder,
) => builder.query<TAdminUser, UserGetProps>({
  query: ({ id }) => `/superadmin/users/${id}`,
  transformResponse: (response: any) => response.user,
  providesTags: (result, error, { id }) => [
    {
      type: 'Login' as ColombusLogisticsTagType,
      id: 'all',
    },
    {
      type: 'Login' as ColombusLogisticsTagType,
      id,
    },
  ],
});

export default getSuperAdminUser;
