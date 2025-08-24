import type { TUser } from '#domain/models/TUser';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

export type UserGetProps = {
  id: string,
};

const userGet = (
  builder: ColombusLogisticsBuilder,
) => builder.query<TUser, UserGetProps>({
  query: () => '/auth/me',
  transformResponse: (it: any) => it.user,
  providesTags: (res, err, req) => [
    {
      type: 'Login' as ColombusLogisticsTagType,
      id: 'all',
    },
    {
      type: 'Login' as ColombusLogisticsTagType,
      id: req.id,
    },
  ],
});

export default userGet;
