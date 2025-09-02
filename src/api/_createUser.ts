import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

type CreateUserRequest = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: string;
};

type CreateUserResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
};

const createUser = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<CreateUserResponse, CreateUserRequest>({
  query: (body) => ({
    url: '/auth/admin/createUser',
    method: 'POST',
    body,
  }),
  transformResponse: (res: any) => res,
  invalidatesTags: (res: any) => [
    { type: 'createUser' as ColombusLogisticsTagType, id: res?.user?.id },
  ],
});

export default createUser;
