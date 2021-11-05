async function solution () {
  let main = document.querySelector('#main');

  let articles = await getArticles();
  articles.map(createElements).forEach(e => main.appendChild(e));
}

function createElements (article) {
  let divEl = document.createElement('div');
  divEl.className = 'accordion';

  let divEl2 = document.createElement('div');
  divEl2.className = 'head';
  let spanEl = document.createElement('span');
  spanEl.textContent = article.title;

  let btn = document.createElement('btn');
  btn.className = 'button';
  btn.id = article._id;
  btn.textContent = 'MORE';
  divEl2.appendChild(spanEl);
  divEl2.appendChild(btn);

  divEl.appendChild(divEl2);
  btn.addEventListener('click', () => toggleElements(article._id, divEl));

  return divEl;
}

async function toggleElements (id, preview) {
  let article = await getMoreInfo(id);

  let p = document.createElement('p');
  p.textContent = article.content;

  if (preview.querySelector('.button').textContent === 'MORE') {
    preview.appendChild(p);
    preview.querySelector('.button').textContent = 'LESS';
  } else {
    preview.querySelector('p').remove();
    preview.querySelector('.button').textContent = 'MORE';

  }
}

async function getArticles () {
  let url = 'http://localhost:3030/jsonstore/advanced/articles/list';

  let res = await fetch(url);
  let data = await res.json();

  return Object.values(data);
}

async function getMoreInfo (id) {
  let url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;

  let res = await fetch(url);
  return await res.json();
}

window.addEventListener('load', () => {
  solution();
});
