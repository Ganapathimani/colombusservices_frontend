import type { TLogin } from '#domain/models/TLogin';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

type LoginResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  expiresIn: string;
};

const createLogin = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<LoginResponse, TLogin>({
  query: (request: Partial<TLogin>) => ({
    method: 'POST',
    url: '/auth/login',
    body: request,
  }),
  transformResponse: (it: any) => it,
  invalidatesTags: (res: any) => [
    {
      type: 'Login',
      id: 'all',
    },
    {
      type: 'Login' as ColombusLogisticsTagType,
      id: res,
    },
  ],
});

export default createLogin;
