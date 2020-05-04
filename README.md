### Security

#### [1. Security Nestjs docs](https://docs.nestjs.com/techniques/security)

- Helmet, Cors, Rate Limit

###### Reading
- https://expressjs.com/en/advanced/best-practice-security.html
- https://helmetjs.github.io/
- https://github.com/nfriedly/express-rate-limit
- https://blog.logrocket.com/rate-limiting-node-js/


#### [2. Eslint security rules](https://github.com/nodesecurity/eslint-plugin-security)

```
npm install --save-dev eslint-plugin-security
```

eslintrc.js
```
"plugins": [
  "security"
],
"extends": [
  "plugin:security/recommended"
]
```

###### Reading
- https://github.com/goldbergyoni/nodebestpractices
- https://nemethgergely.com/nodejs-security-overview/
- https://www.youtube.com/watch?v=1Gun2lRb5Gw


### Performance

#### [Fastfy adapter] (https://docs.nestjs.com/techniques/performance)

###### Pros

- https://www.fastify.io/benchmarks/
- https://www.nearform.com/blog/reaching-ludicrous-speed-with-fastify/
- https://www.youtube.com/watch?time_continue=842&v=_0W_822Dijg&feature=emb_logo
- https://stackoverflow.com/questions/47733390/nestjs-vs-plain-express-performance
- https://github.com/nestjs/nest/runs/482105333
- https://github.com/nestjs/nest/blob/master/benchmarks/all_output.txt

###### Cons
> A fair question is why does Nest use Express as the default HTTP provider? The reason is that Express is widely-used, well-known, and has an enormous set of compatible middleware, which is available to Nest users out-of-the-box.



### Documentation
#### [Compdoc](https://docs.nestjs.com/recipes/documentation#documentation)

```
npm i -D @compodoc/compodoc
npx compodoc -p tsconfig.json -s
http://localhost:8080/
```

### Configuration
#### [Nestjs Configuration](https://docs.nestjs.com/techniques/configuration)

###### Pros
- less boilerplate code, configure globally
- multiple files management


