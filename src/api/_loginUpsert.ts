import type { TLogin } from '#domain/models/TLogin';
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

const loginUpsert = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<string, TLogin>({
  query: (request: Partial<TLogin>) => ({
    method: 'POST',
    url: '/auth/login',
    body: request,
  }),
  transformResponse: (it: any) => it.resultId,
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

export default loginUpsert;
