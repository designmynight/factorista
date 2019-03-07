# Factorista

A simple model factory tool bases on Laravel's Eloquent factories

### Install

`npm install designmynight/factorista --dev`

### Usage

This package is designed for easy use when no package builder (such as webpack) is being used.

We use this tool with Karma, in `karam.conf.js`, add the files

```javascript
files : [
  'node_modules/faker/build/build/faker.js',
  'node_modules/designmynight/factorista/index.js'
]
```

### Defining a factory

All functions available with [Marak's Faker.js](https://github.com/Marak/faker.js) can be used

```javascript
factoryDefine(User, (faker) => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
}));
```

### Calling a factory

```javascript
// make a single user
const user = factory(User).make();

// make mulitple users
const users = factory(User, 5).make();

// make users with overrides
const users = factory(User, 5).make((faker) => ({
    first_name: 'Ralph',
    last_name: faker.lorem.word()
}));
```
