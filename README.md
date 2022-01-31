# Les Projets Cagnottes - Microsoft Teams App

## Prerequisites

- Les Projets Cagnottes - core - [Install Guide here](https://github.com/les-projets-cagnottes/core#getting-started)
- NodeJS 12 - [Download here](https://nodejs.org)

> This App is designed for a single tenant for simplicity. Feel free to help it become multi-tenant as the author is missing a lot of information on the topic

## Creation of the app registration on Microsoft Azure

Browse to the [Microsoft Azure](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and fill the form with the following content :

- Name : Les Projets Cagnottes
- Types of accounts : Accounts in this organization directory only

Next, note the `Application ID` on the overview page. You will need it on the next step.

Browse to the "Certificates & secrets" page of the app and create a new secret client :

- Description : Bot Secret
- Expiration date : 24 months (you should program a reminder to update this secret)

Note the `Application secret` value, it will be needed later.

## Creation of the bot on the Microsoft Bot Framework

Browse to the [Microsoft Bot Framework](https://dev.botframework.com/bots/new) and fill the form with the following content :

- Icon : `Upload the icon of the bot`
- Bot handle : `Value of Application ID`
- Messaging endpoint : `<ROOT URL>/api/messages`
- App type : Single Tenant
- App ID : `Value of Application ID`
- Tenant ID : `Value of Tenant ID`

Other fields may stay as default.

When submitted, browse to the "Channels" page of the bot.

Remove the "Web Chat" channel by clicking Edit and the trash icon.

Clic the Microsoft Teams icon to add a corresponding channel. Let the parameters by default.

## Submit the app to your Teams organization

Checkout this repository and run the following command :

```
export MICROSOFT_APP_ID=<Application ID>
export MICROSOFT_APP_NAME="Les Projets Cagnottes"
gulp
```

Browse to "Manage your apps" on Teams and clic "Submit to your organization". When asked, select the file `manifest/lesprojetscagnottes.zip`.

## Approve the app

As a Teams administrator, browse to the [Microsoft Teams admin center](https://admin.teams.microsoft.com/policies/manage-apps) and approve the submitted custom app.

## Run the app

```
export MICROSOFT_APP_ID=<Application ID>
export MICROSOFT_APP_PASSWORD=<Application secret>
export MICROSOFT_TENANT_ID=<Tenant ID>
npm install
node src/app.js
```