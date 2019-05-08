import React, { Component } from 'react';

import { UserAgentApplication } from "msal";
import { MSALAuthenticationProvider } from "../node_modules/@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProvider";
import { Client, ResponseType } from "@microsoft/microsoft-graph-client";

const clientId = "aa31273b-0fc3-43c3-8abe-08f3234d2e33"; // Client Id of the registered application
const callback = (errorDesc, token, error, tokenType) => {};
// An Optional options for initializing the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#configuration-options
const options = {
	redirectUri: window.location.href,
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

    anchor.download = `${filename}.txt`;
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
}

async function msApiGetPageContent(pageId) {
    let response = await client.api(`/me/onenote/pages/${pageId}/content?includeinkML=true`).get();
    fetchStream(pageId, response);
    console.log('msApiGetPageContent %o', response);
}

function fetchStream(pageId, stream) {
    const reader = stream.getReader();
    let charsReceived = 0;
    let result = '';
  
    // read() returns a promise that resolves
    // when a value has been received
    reader.read().then(function processText({ done, value }) {
      // Result objects contain two properties:
      // done  - true if the stream has already given you all its data.
      // value - some data. Always undefined when done is true.
      if (done) {
        console.log("Stream complete");
        saveFileLocally(pageId, result);
        return;
      }
  
      // value for fetch streams is a Uint8Array
      charsReceived += value.length;
      const chunk = value;
  
      result += new TextDecoder("utf-8").decode(chunk);
  
      // Read some more, and call this function again
      return reader.read().then(processText);
    });
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
            <h2>Download OneNote pages</h2><br></br>
            <ul style={{textAlign: "left"}}> 
                <li>Click following button to download all OneNote pages which title starts with [Aa]tifex. </li>
                <li>Check <a href="https://www.w3.org/TR/InkML/">inkML</a> for standard </li>
                <li>Check <a href="https://github.com/microsoft/InkMLjs">inkMLjs</a> for JavaScript render implementation</li>
                <li> Example
                    <ul>
                        <li>
                            Response data from Graph API, <a href='https://zhenqiang.li/brext/onenote-page.txt'>link</a>
                        </li>
                        <li>
                            Rendered view in OneNote, <a href='https://zhenqiang.li/brext/onenote-page.png'>link</a>
                        </li>
                    </ul>
                </li>
            </ul>

            <button onClick={msApiListPages}>start</button><br/><br/>
            </div>
            );
    }
}

export default MsApi;
