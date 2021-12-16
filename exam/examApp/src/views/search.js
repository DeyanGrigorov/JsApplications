// import { searchAlbums } from "../api/data.js";
// import { html } from "../lib.js";
// import { albumCard } from "./common.js";

// const searchTemplate = (albums, onSearch, params = '') => html`
//     <section class="searchPage">
//       <form @submit=${onSearch}>
//         <fieldset>
//           <legend>Search</legend>

//           <div class="container">
//             <input id="name" name="search" class="name" type="text" .value=${params}>

//             <div class="center-buttonb">
//             <button class="edit-album" type="submit">Search</button>
//             </div>
//           </div>
//         </fieldset>
//       </form>

//       ${albums.length == 0
//         ? html`	<p>No Albums in Catalog!</p>`
//         : albums.map(albumCard)}
//     </section>
// `;


// export async function searchPage(ctx) {
//   const params = ctx.querystring.split('=')[1]
//   let albums = []

//   if (params){
//     albums = searchAlbums(decodeURIComponent(params))
//   }

//   ctx.render(searchTemplate(albums, onSearch, params));

//   function onSearch(event){
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const search = formData.get('search');

//     if (search){
//       ctx.page.redirect('/search?query=' + encodeURIComponent(search));
//     }
//   }
// }













































//Example Search - not included in task!!!

import { searchAlbums } from '../api/data.js';
import { html } from '../lib.js'
//import { getUserData } from '../util.js';


//params = '' to make sure we don't accept undefined
const searchTemplate = (albums, onSearch, params = '') => html`
<section id="search-page" class="dashboard">
            <h1>Search</h1>
           <form @submit=${onSearch}>
               <input type="text" name="search" .value={params}>
               <input type="submit" value="Search">
           </form>

               ${albums.length == 0
               ? html` <p class="no-books">No results.</p>`
               : albums.map(bookTemplate)}
                           
            </ul>          
        </section>`;


const bookTemplate = (book) => html`
 <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>Type: ${book.type}</p>
                    <p class="img"><img src=${book.imageUrl}></p>
                    <a class="button" href="/details/${book._id}">Details</a>
                </li>`;




export async function searchPage(ctx) {  
const params = ctx.querystring.split('=')[1];
let books = [];

if (params){
books = await searchBooks(decodeURIComponent(params))
}

    ctx.render(searchTemplate(books, onSearch, params));

    function onSearch(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get('search').trim();

        if (search){
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }
}

//In api/data.js
//export async function searchBooks(query) {
//    return api.get('/data/books?where=' + encodeURIComponent(`title LIKE "${query}"`));//note query clause syntax
//}

//Import in app.js and add page('/search', searchPage)