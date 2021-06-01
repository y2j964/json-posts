import { fetchPosts, fetchUser } from './api';
import {
  renderLoadingIndicatorInDOM,
  removeLoadingIndicatorFromDOM,
} from './loadingIndicator';
import { post } from './types/post';
import { isReqError } from './types/reqError';
import { user } from './types/user';

const createCard = (post: post, user: user): HTMLLIElement => {
  const container = document.createElement('li');
  container.className = 'max-w-xl mb-8';

  const cardTitle = document.createElement('h2');
  cardTitle.className = 'text-3xl font-bold mb-4';
  cardTitle.textContent = post.title;

  const smallPrintContainer = document.createElement('div');
  smallPrintContainer.className = 'mb-2 leading-none';
  const bySpan = document.createElement('span');
  bySpan.textContent = 'By: ';
  const authorSpan = document.createElement('span');
  authorSpan.textContent = user.name;
  smallPrintContainer.appendChild(bySpan);
  smallPrintContainer.appendChild(authorSpan);

  const bodyContainer = document.createElement('div');
  const body = document.createElement('p');
  body.textContent = post.body;
  bodyContainer.appendChild(body);

  container.appendChild(cardTitle);
  container.appendChild(smallPrintContainer);
  container.appendChild(bodyContainer);

  return container;
};

const createCardsFrag = async (posts: post[]): Promise<DocumentFragment> => {
  const fragment = document.createDocumentFragment();

  // using for loop b/c we need this block to finish before appending child
  for (let i = 0; i < posts.length; i++) {
    const user = await fetchUser(posts[i].userId);
    const card = createCard(posts[i], user);
    fragment.appendChild(card);
  }
  return fragment;
};

const renderCards = async (): Promise<void> => {
  const cardList = document.querySelector('.card-list') as HTMLUListElement;
  renderLoadingIndicatorInDOM(cardList);

  try {
    const posts = await fetchPosts();
    const cardsFrag = await createCardsFrag(posts);
    removeLoadingIndicatorFromDOM();
    cardList.appendChild(cardsFrag);
  } catch (err: unknown) {
    if (isReqError(err)) return console.log(`error: ${err.message}`);
    console.log(err);
  }
};

export default renderCards;
