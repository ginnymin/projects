# Dogs! Select your favorite dogs and (hopefully) get a match

## Table of contents

- [Overview](#overview)
  - [Getting started](#getting-started)
  - [Scripts](#scripts)
  - [Links](#links)
  - [Built with](#built-with)

## Overview

### Getting started

To run the application locally:

- Run `yarn` to install dependencies
- Run `yarn dev`
- Open a browser and navigation to `http://localhost:3000` (the port number could be different if you have another application running locally. Check the console to verify the port number)

### Scripts

- `yarn dev` - Runs the application locally via the NextJS development server
- `yarn test` - Runs all unit tests in the application
- `yarn lint` - Runs `tsc` and `eslint` to validate types and lint rules
- `yarn build` - Builds the application for production
- `yarn start` - Runs the application locally against the production build (must run `build` first)

### Links

- Solution URL: https://github.com/ginnymin/projects/tree/main/apps/favorite-dogs-matcher
- Live Site URL: https://favorite-dogs-matcher.vercel.app/

### Built with

- Typescript
- Vitest and React Testing Library
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [HeadlessUI](https://headlessui.com/) - Headless, accessible React components
- [SWR](https://swr.vercel.app/) - For data fetching and cache
