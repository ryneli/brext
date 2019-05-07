import React, { Component } from 'react';

import { UserAgentApplication } from "msal";
import { MSALAuthenticationProvider } from "../node_modules/@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProvider";
import { Client, ResponseType } from "@microsoft/microsoft-graph-client";

const clientId = "aa31273b-0fc3-43c3-8abe-08f3234d2e33"; // Client Id of the registered application
const callback = (errorDesc, token, error, tokenType) => {};
// An Optional options for initializing the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#configuration-options
const options = {
	redirectUri: window.location.origin,
};
const graphScopes = ["user.read", "mail.send", "notes.read"]; // An array of graph scopes

// Initialize the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#initialization-of-msal
const userAgentApplication = new UserAgentApplication(clientId, undefined, callback, options);
const authProvider = new MSALAuthenticationProvider(userAgentApplication, graphScopes);
const clientOptions = {
	authProvider, // An instance created from previous step
};
const client = Client.initWithMiddleware(clientOptions);

function saveFileLocally(filename, content) {
    /*
    * Save a text file locally with a filename by triggering a download
    */

    const blob = new Blob([content], { type: 'text/plain' });
    const anchor = document.createElement('a');

    anchor.download = `${filename}.html`;
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
}

async function msApiGetPageContent(pageId) {
    let response = await client.api(`/me/onenote/pages/${pageId}/content`).get();
    console.log('msApiGetPageContent %o', response);
    saveFileLocally(pageId, response.documentElement.outerHTML);
}

async function msApiListPages(prefix) {
    const ids = [];
    try {
        let response = await client.api("/me/onenote/pages").filter("startswith(title,'artifex') or startswith(title,'Artifex')").get();
        console.log(response);
        for (let i = 0; i < response.value.length; i++) {
            msApiGetPageContent(response.value[i].id);
            ids.push(response.value[i].id);
        }
    } catch (error) {
        throw error;
    }
    return ids;
}

class MsApi extends Component {
    

    render() {
        return (
            <div>
            <h2>Download OneNote pages which title starts with [Aa]rtifex</h2><br></br>
            <button id="SignIn" onClick={msApiListPages}>Download Pages</button><br/><br/>
            <pre id="json"></pre>
            </div>
            );
    }
}

export default MsApi;
