import type { TSignup } from '#domain/models/TSignup';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

type SignupResponse = {
  message: string;
  user: {
    staffRole: string;
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

const createSignup = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<SignupResponse, TSignup>({
  query: (request: Partial<TSignup>) => ({
    method: 'POST',
    url: '/auth/signup',
    body: request,
  }),
  transformResponse: (it: any) => it,
  invalidatesTags: (res: any) => [
    {
      type: 'Signup',
      id: 'all',
    },
    {
      type: 'Signup' as ColombusLogisticsTagType,
      id: res,
    },
  ],
});

export default createSignup;
