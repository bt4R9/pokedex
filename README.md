## This is the demo pokedex application.

### Helpful information
**Libraries**
- React
- Redux

**Bundler**
- webpack

**Code quality**
- eslint
- stylelint
- jest

### Installation
```
npm install
# The application needs to download the Pokemon database.
npm run pokemons:init
```
Since pokeapi.co limits the number of requests and is generally unstable, you may need to run this command several times. In case of failure, all the downloaded information is saved, so you don't have to download something twice. Anyway the requested database is already included in the application, so you don't have to waste time.

### Usage
```
# development build (localhost:8000)
npm run app:watch
# production build (localhost:8000)
npm run app:build
```

### TODO
- smooth popup animation
- pokemon's description
- better mobile experience
- IndexedDB/WebSQL/PaunchDb for data storage
- service worker cache invalidation
- unit tests