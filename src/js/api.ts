import { post } from './types/post';
import { user } from './types/user';

const fetchPosts = (): Promise<post[]> =>
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((posts: post[]) => posts);

const fetchUser = (userId: number): Promise<user> =>
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user: user) => user)
    .catch((err: { message: string }) => console.log(`error: ${err.message}`));

export { fetchPosts, fetchUser };
