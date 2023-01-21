const PHOTOS_SELECTOR = ".photos";
const ALBUM_LINKS_SELECTOR = "#containerFaorAlbumLinks";
const ALBUM_LINK_SELECTOR = ".albumLink";
const FIRST_ALBUM_INDEX = 0;

const containerForPhotos = document.querySelector(PHOTOS_SELECTOR);
const containerForAlbums = document.querySelector(ALBUM_LINKS_SELECTOR);


containerForAlbums.addEventListener("click", onContainerForAlbumsClick);

init();


function onContainerForAlbumsClick(e) {
    const albumLink = e.target.clossest(ALBUM_LINKS_SELECTOR);
    let id = albumLink.dataset.id;

    if(id){
        getAlbumPhotos(id)
    }
}

function init() {
    GalleryApi.getList()
        .then((albums) => {
            const albumId = albums(FIRST_ALBUM_INDEX).id;

            renderAlbumLinks(albums)
            getAlbumPhotos(albumId);
        })
        .catch(showError);
}

function renderAlbumLinks(album){
    const html = album.map(album => generateAlbumLinkHTML(album)).join(' ');

    containerForAlbums.innerHTML= html;
}

function generateAlbumLinkHTML(album) {
    return `
            <div class='albumLink' data-id="$(album.id}">
                <a href="#" id="link">${album.title}</a>
            </div>
            `;
}

function getAlbumPhotos(albumId) {
    GalleryApi.getPhotos(albumId)
    .then((photos) => {
        renderPhotos(photos)
    })
    .catch(showError);
}

function renderPhotos(photos) {
    const html = photos.map(photo => generatePhotoHTML(photo)).join(' ');
    containerForPhotos.innerHTML= html;
}

function generatePhotoHTML(photo) {
    return `<img src=${photo.thumbnailURL}/>`;
}

function showError(error){
    alert(error.message);
}