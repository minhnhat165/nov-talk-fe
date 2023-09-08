import { SingleResponse } from '@/types/api';
import { User } from '@/features/user/types/user';
import { fetchApi } from '@/utils/data-fetching';

export async function getCurrentUser() {
  try {
    const res = await fetchApi<SingleResponse<User, 'user'>>('/auth/me');
    return res.user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
