# OttoIO (otto-io-fe)

FrontEnd for OTTOio

## Install the dependencies

```bash
yarn or npm install
```

Configure the backend API

    cp quasar.env.example quasar.env
    # user the file with the appropriate information

to whatever the new back-end is hosted, for now there is no support for `.env` properties (WIP)

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
# Development
QENV=development quasar dev
# Staging
QENV=test quasar dev
```

### Lint the files

```bash
yarn lint
```

### Build the app for production

```bash
quasar build
QENV=production quasar serve  dist/spa
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
