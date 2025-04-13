# Developing the CUL Fork
## The fork is principally to include plugins
The source for the plugins we are using is in `src/culPlugins`, with corresponding tests in
`__tests__/src/culPlugins`.

### Outside of Plugins
There is additional code in the Mirador src to allow native object display of PDFs.
See `src/components/NativeObjectViewer.js` etc.

## It's hard to fork projects
Please begin all your commit messages outside `main` or PRs to upstream with `COLUMBIA: `.

## Running Mirador locally for development

Mirador local development requires [nodejs](https://nodejs.org/en/download/) to be installed.

1. Run `npm install` to install the dependencies.

### Starting the project

```sh
$ npm start
```

Then navigate to [http://127.0.0.1:4444/](http://127.0.0.1:4444/)

#### With SSL, or other devServer customizations
To use against live manifests from a SSL host, the dev server should also be running over SSL.

Create a JSON file of other [webpack-dev-server configurations](https://webpack.js.org/configuration/dev-server/)
An example configuration:
```json
{
  "allowedHosts": ["dev.local"],
  "host": "dev.local",
  "hot": true,
  "server": {
    "options": {
      "cert": "/path/to/self-signed/dev.local.crt",
      "key": "/path/to/self-signed/dev.local.key"
    },
    "type": "https"
  }
}
```

In the example JSON above, there are self-signed certs for the host name "dev.local".

*This also requires editing `/etc/hosts` to resolve this domain name to localhost (127.0.0.1).*
Add a line like the below to /etc/hosts:
```sh
127.0.0.1 dev.local
```

#### Self-signed certs
```sh
$ openssl req -x509 -newkey rsa:4096 -keyout dev.local.key -out dev.local.crt -sha256 -days 3650 -nodes -subj "/C=US/ST=NY/L=NYC/O=ColumbiaUniversity/OU=Libraries/CN=dev.local"
```

Your browser may prompt you about trusting this certificate the first time you visit a page using it. A cert can be used on any port, so you could use the same cert for running DLC, etc. with an appropriate Rails configuration.

### Seeing CUL content
While you could always add a DLC manifest to the demo client that starts up "manually", there is a convenience page at `/cul.html` (i.e., from the source at `__tests__/integration/mirador/cul.html`) that has a variety of testing manifest links of different content types.


And then pass the path to this JSON file in the `DEV_SERVER_CONFIG` environment variable.
```sh
$ DEV_SERVER_CONFIG=relative/path/to/devServer.json npm start
``` 