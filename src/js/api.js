const fetchPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => posts)
    .catch((err) => console.log(`error: ${err}`));

const fetchUser = (userId) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => user)
    .catch((err) => console.log(`error: ${err}`));

export { fetchPosts, fetchUser };
