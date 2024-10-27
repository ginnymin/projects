# Online Smoothie Recipebook

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built in and with](#built-in-and-with)
- [Scripts](#scripts)

## Overview

According to Wikipedia:

> _A smoothie is a thick and creamy beverage made from pureed raw fruit,
> vegetables, and sometimes dairy products (e.g. milk, yogurt, ice-cream
> or cottage cheese), typically using a blender._

**Your task is to build a webpage where a user can create and manage
their own smoothie recipes.**

#### Basic requirements

- User can create a new smoothie with:
  - A unique name
  - A set of ingredients w/ quantity information (e.g. 1 cup)
- User can delete a smoothie
- User can edit an existing smoothie name, ingredients
- User can return to their smoothies in a new browser session using, for example, Window.localStorage

#### Optional requirements

- User can search smoothies by name
- User can tag their smoothies
- User can save their smoothies to a database
- User can share smoothies with others at public URL
- User can to add new ingredients
- Integrate a continuous integration/deployment system

### Links

- Solution URL: https://github.com/ginnymin/projects/tree/main/apps/smoothie-recipebook
- Live Site URL: https://smoothie-recipebook.vercel.app

### Built in and with:

- Typescript
- Jest and React Testing Library
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [HeadlessUI](https://headlessui.com/) - Headless, accessible React components

## Scripts

In the `smoothie-recipebook` project directory, you can run:

### `yarn dev`

Run a dev version of the application at `http://localhost:3000`.

### `yarn lint`

Performs type checking with Typescript and code quality checks with ESLint.

### `yarn test`

Runs unit tests.

### `yarn build`

Builds a production version of the application.
