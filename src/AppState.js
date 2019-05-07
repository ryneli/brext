export let RootPath = '/';
if (window.location.hostname !== 'localhost') {
    RootPath += 'brext/';
}
