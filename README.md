# web live: https://gigwire.com/
### run first
```
make help
```

### Main API is on AWS and will not be posted publicly. 
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
