import React from 'react';
import ReactDOM from 'react-dom';
import WelcomePage from './WelcomePage';
import * as Keycloak from 'keycloak-js';
import axios from 'axios';


//Get request to retreive Keycloak info
axios.get('https://openid.meet.binastar.de/api/keycloak.json').then(function(response) {
  const keycloak = Keycloak({
    url: response.data["auth-server-url"],
    realm: response.data["realm"],
    clientId: response.data["resource"],
    redirectUri: response.data["redirectUrl"]
  });

let initOptions = {
    url: 'https://auth.meet.binastar.de/auth/', realm: 'customer-meet', clientId: 'customer-meet-binastar-de', onLoad: 'login-required'
}


let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {

    if (!auth) {
        console.info("Not Authenticated");
    } else {
        console.info("Authenticated");
    }

    //React Render
    ReactDOM.render(<WelcomePage />, document.getElementById('react'));

    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);

    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });


    }, 60000)

}).error(() => {
    console.error("Authenticated Failed");
});
