# Reactive Analytics Server

Reactive Analytics server is a strongly typed NodeJS application that showcases how to wrap GraphQL around RESTful services to provide client applications the ability to request only the specific information needed at the time it is needed.

## Installation

Reactive Analytics server has package dependencies on the parent repository that gets injected using Lerna. From the root directory run `yarn install && yarn bootstrap` to install all dependencies.

```sh
  [ReactiveAnalytics] $ yarn install
  [ReactiveAnalytics] $ yarn bootstrap
```

## Working with the server

Reactive Analytics server uses experimental decorators to provide meta-data for GraphQL

### Naming Convention

- All foldres named using kebab case
- All files containing experimental decorators or GraphQL scalars are title case
- All other files are camel case
- Files containing Queries, Subscriptions, Mutations, and Field Resolvers are named {DataType}**.resolver.ts**
- Files containing schema definitions for objects are named DataType}**.schema.ts**

### Files and Folder Structure

    |-- src
        |-- connectors: definition for fetch<T> function
        |-- graph-ql: schema and resolver definitions
            |-- {object-name}: schma and resolver for a specific object type
                |-- *.schema.ts: class description of the objects schema
                |-- *.resolver.ts: endpoints and field resolvers for the object
            |-- mock-data: stock information used in OFFLINE mode
            |-- services: utility items to provide extra functionality

### Type-Graphql

Reactive Analytics server uses [type-graphql](https://typegraphql.ml/) to provide type-safety to the server. For more information on the motivation for this please read [TypeGraphQL - Why?](https://typegraphql.ml/docs/introduction.html#why).
