import { fetchPosts, fetchUser } from "./api";
import {
  renderLoadingIndicatorInDOM,
  removeLoadingIndicatorFromDOM,
} from "./loadingIndicator";
import { post } from './types/post';
import { user } from './types/user';

const createCard = (post:post, user:user): HTMLLIElement => {
  const container = document.createElement("li") as HTMLLIElement;
  container.className = "max-w-xl mb-8";

  const cardTitle = document.createElement("h2") as HTMLHeadingElement;
  cardTitle.className = "text-3xl font-bold mb-4";
  cardTitle.textContent = post.title;

  const smallPrintContainer = document.createElement("div") as HTMLDivElement;
  smallPrintContainer.className = "mb-2 leading-none";
  const bySpan = document.createElement("span") as HTMLSpanElement;
  bySpan.textContent = "By: ";
  const authorSpan = document.createElement("span") as HTMLSpanElement;
  authorSpan.textContent = user.name;
  smallPrintContainer.appendChild(bySpan);
  smallPrintContainer.appendChild(authorSpan);

  const bodyContainer = document.createElement("div") as HTMLDivElement;
  const body = document.createElement("p") as HTMLParagraphElement;
  body.textContent = post.body;
  bodyContainer.appendChild(body);

  container.appendChild(cardTitle);
  container.appendChild(smallPrintContainer);
  container.appendChild(bodyContainer);

  return container;
};

const renderCards = async (): Promise<void> => {
  const cardList = document.querySelector(".card-list") as HTMLUListElement;
  renderLoadingIndicatorInDOM(cardList);

  const posts = await fetchPosts();
  const fragment = document.createDocumentFragment() as DocumentFragment;

  // using for loop b/c we need this block to finish before appending child
  for (let i = 0; i < posts.length; i++) {
    const user = await fetchUser(posts[i].userId);
    const card = createCard(posts[i], user);
    fragment.appendChild(card);
  }
  removeLoadingIndicatorFromDOM();
  cardList.appendChild(fragment);
};

export default renderCards;
