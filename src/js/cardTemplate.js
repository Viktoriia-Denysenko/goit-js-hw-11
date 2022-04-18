// function cardTemplate(hits) {
//   console.log(hits);
//   const markup = hits
//     .map(picture => {
//       return `
//     <div class="photo-card">
//      <a href="${picture.webformatURL}"><img src="${picture.largeImageURL}" alt="${picture.tags}" loading="lazy" /></a>
//     <div class="info">
//       <p class="info-item">
//         <b>
//         <span class="card-description">Likes </span>
//         ${picture.likes}
//         </b>
//       </p>
//       <p class="info-item">
//         <b><span class="card-description">Views </span> ${picture.views}</b>
//       </p>
//       <p class="info-item">
//         <b><span class="card-description">Comments </span> ${picture.comments}</b>
//       </p>
//       <p class="info-item">
//         <b><span class="card-description">Downloads </span> ${picture.downloads}</b>
//       </p>
//     </div>
//   </div>
//     `;
//     })
//     .join('');
//   //   return markup;
// }
// export { cardTemplate };
