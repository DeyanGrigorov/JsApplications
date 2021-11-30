import {page} from './lib.js';
import { detailsPage } from './views/details.js';
import { catalogPage } from './views/catalog.js';

const root = document.querySelector('div.container')

import * as api from './api/data.js'
window.api = api

page(decorateContext)
page('/', catalogPage);
page('details/:id', detailsPage);
page('/create', () => console.log('create'));
page('/edit/:id', () => console.log('edit'));
page('/login', () => console.log('login'));
page('/register', () => console.log('register'));
page('/my-furniture', () => console.log('my-furniture'));

page.start();

function decorateContext(ctx, next){
  ctx.render = (content) => render(content, root);

  next()
}


