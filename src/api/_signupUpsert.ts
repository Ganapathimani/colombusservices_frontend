import type { TSignup } from '#domain/models/TSignup';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const signupUpsert = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<string, TSignup>({
  query: (request: Partial<TSignup>) => ({
    method: 'POST',
    url: '/auth/register',
    body: request,
  }),
  transformResponse: (it: any) => it.resultId,
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
