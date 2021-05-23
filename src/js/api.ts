import {post} from './types/post';
import {user} from './types/user';

const fetchPosts = (): Promise<post[]> =>
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => posts)
    .catch((err) => console.log(`error: ${err}`));

const fetchUser = (userId:number): Promise<user> =>
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => user)
    .catch((err) => console.log(`error: ${err}`));

export { fetchPosts, fetchUser };
