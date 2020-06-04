# web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
Environment params:
* `VUE_APP_BASE_API_URL=http://127.0.0.1/api` request to api
* `VUE_APP_GOOGLE_MAPS_API_KEY=`
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### How to build frontend on production
```
docker-compose up gw_frontend && docker exec -it gw_nginx sh
docker(gw_nginx): cd /var/www/front_build && rm -rf html && mv html_tmp html
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
