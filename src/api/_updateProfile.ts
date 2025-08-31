// src/api/updateProfile.ts
import type { ColombusLogisticsBuilder, ColombusLogisticsTagType } from './colombusLogisticsApi';

type UpdateProfileRequest = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
};

type UpdateProfileResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
};

const updateProfile = (
  builder: ColombusLogisticsBuilder,
) => builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
  query: (body) => ({
    url: '/auth/updateProfile',
    method: 'PUT',
    body,
  }),
  transformResponse: (res: any) => res,
  invalidatesTags: (res: any) => [
    { type: 'User' as ColombusLogisticsTagType, id: res?.user?.id },
  ],
});

export default updateProfile;
