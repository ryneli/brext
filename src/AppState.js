export let RootPath = '/';

/**
 * Local service will use http protocal. 
 * If local service, change root path
 */
if (window.location.protocol !== 'http:') {
    RootPath += 'brext/';
}
