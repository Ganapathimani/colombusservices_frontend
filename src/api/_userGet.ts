import type { TUser } from '#domain/models/TUser';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

export type UserGetProps = {
  id: string;
};

const getUser = (builder: ColombusLogisticsBuilder) => builder.query<TUser, UserGetProps>({
  query: ({ id }) => `/auth/user/${id}`,
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

export default getUser;
