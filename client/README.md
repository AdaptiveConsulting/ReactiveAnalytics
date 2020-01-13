# Reactive Analytics Client

Reactive Analytics client is a GraphQL driven React application that showcases how to consume GraphQL queries and subscriptions within a strong-typed React application.

## Installation

Reactive Analytics client has package dependencies on the parent repository that gets injected using Lerna. From the root directory run `yarn install && yarn bootstrap` to install all dependencies.

```sh
  [ReactiveAnalytics] $ yarn install
  [ReactiveAnalytics] $ yarn bootstrap
```

## Working with the Client

### Naming Convention

- All folders named using kebab case
- Only use the `.tsx` extension for files containing tsx syntax
- All `.tsx` files named using title case and the file name must match the default export
- All `.ts` files named using camel case
- Exceptions to the guidelines are okay when warrented!

### Files and Folder Structure

> Note: not all files and folders are listed, only the essentials

    |-- src
        |-- __generated__: auto-generated the type definition files for graphql
        |-- apollo: the configuration files fo the apollo client
        |-- assets: fonts and images that do not belong in public
            |-- StyledComponents.tsx: all global styled-components
        |-- common: any file that does not have an obvious parent
        |-- containers: data-fetching and sub-component rendering elements
            |-- Apollo____Container.tsx: main container file
            |-- components: rendering elements for the parent container
            |-- graphql: fragments and connections for the parent container
        |-- rt-theme: files used to generate the global style of the client

### Components

Where appropriate use

- React.FunctionComponent over React.Component
- Folders with index.ts exports for containers instead of placing files directly in the root container folder
- Styled-components instead of basic HTML elements even if the style is empty
- Strongly typed objects

### GraphQL Ecosystem

Reactive Analytics client uses graphql import syntax to seperate fragments from queries. When writting a query opt to move non-identification fields into their own fragment file. In the query import the fragment using `#import "{relativepath}.graphql"` at the top of the query file. Keep all graphql Queries, Subsriptions, Mutations, and Fragments in seperate **.graphql** files. This will allow apollo-codegen to easily detect the elements and generate typings.
