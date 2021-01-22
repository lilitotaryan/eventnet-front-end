import { userData } from 'mockData';

export async function fetchUser() {
  const userResponse = await userData;
  console.log('user response is: ', userResponse);
  return userResponse;
}
