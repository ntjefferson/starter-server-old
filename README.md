# Starter Project - Server
This project has been created to be used as a foundation for future applications and to work seamlessly with it's parallel client-side repo - [Starter Project - Client](https://github.com/ntjefferson/starter-client).

## Content
- [Overview](#overview)
- Initial Requirements
- Setting Up EC2
- Authentication / Authorization
- Environment Variables
- File Structure
- Logging and Monitoring

## Overview

As mentioned in the intro, this project's goal is to create a "template" application that I can use for future endeavors. By creating this repo and documentating the steps taken to create a robust foundation for each future project, I can start projects quicker and make the work more streamlined.

The best way to remember *why* a code was written a specific why or *why* a directory was structured is to write down *why* you did it to begin with - hence the meaning behind the documentation of this repo!

## Initial Requirements

- The file is written in Node.js, with Express.js to handle the API and routing.
- The server is expected to be hosted on an AWS EC2 instance, Ubuntu 18+ specifically.
- The database is Postgres, and hosted on AWS RDS.
- Logging is done with `morgan` and `winston`, and monitoring is in Datadog.

## Setting Up EC2

To launch the project on an EC2 instance (remember, Ubuntu 18+ is preferred), follow this link here step-by-step: https://medium.com/@Keithweaver_/setting-up-mern-stack-on-aws-ec2-6dc599be4737

However, there is one change that needs to be made. Instead of...

```
npm install pm2 -g
```

Use this specific version of `pm2` to download...

```
npm install pm2@3.2.4 -g
```



## Authentication / Authorization

The project works in parallel with it's client side to authenticate clients with Firebase (the session token is passed from client to server and authenticated by Google). The Firebase credentials are set in `~/config/firebase.js`.

Once the token has been authenticated by Google by looking at the Firebase store, the initial request is sent back a JWT token so authorize future requests, this can be seen in the `info.js` route in `~/routes/platform/v1/info.js`.

*Remember, read over the `info.js` file and change out the test/example values.*

## Environment Variables

For the repo to work properly, the following environment variables need to be set in a `.env` file in the root directory.

```
# Database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

# Firebase Config
FB_TYPE=
FB_PROJECT_ID=
FB_PRIVATE_KEY_ID=
FB_PRIVATE_KEY=
FB_CLIENT_EMAIL=
FB_CLIENT_ID=
FB_AUTH_URI=
FB_TOKEN_URI=
FB_AUTH_PROV=
FB_CLIENT_CERT=

# JWT 
JWT_SECRET=
```
*Remember to differentiate between `dev` and `prod` environments.*

## File Structure

The current file structure is as follows:
```
- config
- middleware
- routes
    - platform
        - v1
- server.js
```

The `config` folder holds all configuration files that will be used in at least one other script. This can include database configurations for querying a database (`database.js`) or the Firebase configuration for authentication (`firebase.js`).

The `middleware` folder includes files to be ran before specific routes, like authorization or API limits.

The `routes` folder is split further into a `platform` folder. This folder is API calls made *from the client application itself*. I set this up so that if there were to be a developer portal made, it'd be separate from the `platform` folder.

The `server.js` file is where the scripts are ran to run the server application.

## Logging and Monitoring

Datadog is the preferred monitoring application, with a Datadog agent being set up to monitor the EC2 instance's performance (see: https://app.datadoghq.com/account/settings#agent/ubuntu).

Monitoring the logs can be set up for both Nginx and Node.js with `winston` and `morgan`. However, both may produce repetitive logs.

### Setting up Nginx on Datadog Logging

Follow this guide here step-by-step: https://github.com/DataDog/integrations-core/tree/master/nginx

However, if you run into an issue with the `datadog-agent` unable to read the Nginx log files with a `permission denied` error, you'll need to modify the permission of the logs.

```
sudo chmod -R +644 /var/log/nginx/
```

Permission `0644` indicates that files are readable/writeable by the file's owner and *only readable* by everyone else. 
