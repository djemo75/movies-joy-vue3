The project is bootstrapped using [`@vue/cli`](https://cli.vuejs.org).

# Getting Started

## Step 1: Configure environment variables

Create an **.env.local** and put the following credentials as content and update the missing ones:

```bash
VUE_APP_MOVIE_DB_API_URL=https://api.themoviedb.org/3
VUE_APP_MOVIE_DB_ACCESS_TOKEN=
VUE_APP_OAUTH_TOKEN_ENDPOINT=https://oauth2.googleapis.com/token
VUE_APP_OAUTH_CLIENT_ID=
VUE_APP_OAUTH_CLIENT_SECRET=
VUE_APP_OAUTH_REDIRECT_URL=http://localhost:8080/oauth/callback
VUE_APP_OAUTH_AUTHORIZATION_PAGE_URL=https://accounts.google.com/o/oauth2/v2/auth
VUE_APP_GOOGLE_API_URL=https://www.googleapis.com
```

## Step 2: Install dependencies
```
npm install
```

## Step 3: Run the application for development
```
npm run serve
```

If everything is set up correctly, the application should run on the following URL - http://localhost:8080/
