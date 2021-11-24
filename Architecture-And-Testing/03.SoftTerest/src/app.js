import { showCatalogPage } from "./views/catalog.js"
import { showHomePage } from "./views/home.js"
import { showSection } from "./dom.js"

const links = {
  'homeLink': 'home',
  'catalogLink': 'catalog',
}

const views = {
  'home': showHomePage,
  'catalog': showCatalogPage
}

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

const ctx = {
  goTo,
  showSection,
}

function onNavigate(event){
  const name = links[event.target.id];
  if (name){
    event.preventDefault();
    goTo(name);
  }

}

function goTo(name, ...params){
  const view = views[name];
  if (typeof view == 'function'){
    view(ctx, ...params);
  }
}