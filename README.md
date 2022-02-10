# Herosaga
A mockup NFT Marketplace where user can mint, buy, and sell generated virtual items.

## Table of contents
* [Features](#features)
* [Technologies](#technologies)
* [Installation](#installation)
* [Run Locally](#run_local)
* [Deployment](#deployment)
* [Screenshots](#screenshots)

## Features
These are the basic functionalities/feature of the web app
* Login and Registration
* CRUD functionality
* Minting or creation of NFT item
* Buying feature
* Selling Feature

## Technologies
|  Front End   |
| ------------|
| ReactJS     |
| Sass        |
| Webpack     | 
| Axios       | 
| Typescript  | 

## Installation
```
$ npm i
```

## Run locally
Before running the app in your local server, make sure you set the env and this api from the server

* URL=http://localhost:5000
* AUTH=http://your-server.com/check-logged-in-user
* LOGOUT=http://your-server.com/logout
* CHANGE_PASSWORD=http://your-server.com/change/password
* CANCEL_SELL=http://your-server.com/cancel/sell/nft
* BUY_NFT=http://your-server.com/buy/nft
* SELL_NFT=http://your-server.com/sell/nft
* GET_TRANSACS=http://your-server.com/user/transactions/get-all
* MINT_BOX=http://your-server.com/mint/box
* GET_ALL_NFT=http://your-server.com/user/nft/get-all
* GET_MP_NFT=http://your-server.com/nft/get-all
* VERIF_EMAIL=http://your-server.com/verify/email
* REG_USER=http://your-server.com/register
* LOGIN_USER=http://your-server.com/login
* GET_TOKEN=http://your-server.com/getToken
* FORGET_PW=http://your-server.com/forgot-password
* RESET_PW=http://your-server.com/reset/password

After you setup the env now start your app.
```
$ npm start
```

## Deployment
Deploy your server in [Netlify](https://www.netlify.com/)




