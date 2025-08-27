import type { TSignup } from '#domain/models/TSignup';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

type SignupResponse = {
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

const signupUpsert = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<SignupResponse, TSignup>({
  query: (request: Partial<TSignup>) => ({
    method: 'POST',
    url: '/auth/register',
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

export default signupUpsert;
