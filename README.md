# Foundation libsass template

This is a template to start your own project that uses gulp and libsass!

## Requirements

You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [npm >= 2.0.0](https://github.com/npm/npm): pacakge manager for node, bundled with Node.js

## Quickstart

```bash
git clone git@github.com:zurb/foundation-libsass-template.git
npm install
npm run bower-install
npm run gulp
```

And you're set!

## Directory Structure

  * `bower_components`: frontend assets for foundation and its dependencies, you should don't touch them, because if you update them, your changes will be overwritten
  * `gulp`: actually this folder contains small task, which control the build step
  * `public`: all files for your website will be bundled or copied into this directory
  * `src`: this directory contains your app files
    * `js`: your javascript files, they will be concatenated with foundations file into app.js
    * `scss`: your custom app styles
    * `pages`: your html pages