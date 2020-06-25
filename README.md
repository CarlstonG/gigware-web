# web
### run first
```
make help
```

### Compiles and hot-reloads for development
Environment params:
* `VUE_APP_BASE_API_URL=http://127.0.0.1/api` request to api
* `VUE_APP_GOOGLE_MAPS_API_KEY=`
```
npm run serve
```

### How to build frontend on production
```
docker-compose up gw-frontend && docker exec -it gw-nginx bash
docker(gw_nginx): cd /var/www/frontend_build && rm -rf html && mv html_tmp html
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
