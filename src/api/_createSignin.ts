import type { TLogin } from '#domain/models/TLogin';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

type LoginResponse = {
  message: string;
  user: {
    phone: string;
    companyname: string;
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  expiresIn: string;
};

const createSignin = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<LoginResponse, TLogin>({
  query: (request: Partial<TLogin>) => ({
    method: 'POST',
    url: '/auth/signin',
    body: request,
  }),
  transformResponse: (it: any) => it,
  invalidatesTags: (res: any) => [
    {
      type: 'Signin',
      id: 'all',
    },
    {
      type: 'Signin' as ColombusLogisticsTagType,
      id: res,
    },
  ],
});

export default createSignin;
