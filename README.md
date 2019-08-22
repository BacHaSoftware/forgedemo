# BACHASOFTWARE AUTODESK FORGE DEMO

  ## Description

  This sample is a demo from [Bac Ha Software Forge demo](https://3d.bachasoftware.com/demo/forge)

  ## Setup

  For using this sample, you need an Autodesk developer credentials. Visit the [Forge Developer Portal](https://developer.autodesk.com/), sign up for an account, then [create an app](https://developer.autodesk.com/myapps/create). For this new app, use http://localhost:3000/api/forge/callback/oauth as Callback URL, although is not used on 2-legged flow. Finally take note of the **Client ID** and **Client Secret**.

  ## How to run things locally

  Install [Node.js](https://nodejs.org).
  Navigate to the folder where this repository was cloned and use the following:
  1. Install the required packages:
    > npm install
  2. Update the **Client ID** and **Client Secret** and run server: 
  - *Method 1*: On the terminal type:
  FORGE_CLIENT_ID=<<*YOUR CLIENT ID FROM DEVELOPER PORTAL*>> FORGE_CLIENT_SECRET=<<*YOUR CLIENT SECRET*>> npm start
  - *Method 2*: On the repository folder, open file config.js and update the **FORGE_CLIENT_ID** and **FORGE_CLIENT_SECRET** then on the terminal type `npm start`

  Open the browser: http://localhost:3000.