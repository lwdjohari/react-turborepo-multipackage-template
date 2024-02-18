# `Modern Monorepo React Dev`
Template for React multi packages/shared packages development with features such as : 

- `turborepo`
- `vite`
- `react v18`
- `storybook v7`
- `grpc-web`
- `proto-gen.js`
- `jest`
- `swc`

The purpose of this template is to have modern industry standard tools for frontend developments without sacrifice productivity and repetitive pain staking tools wrestling.

## Benefits
1. Hot Module Reload (for all library/package)
2. Easy shared package import
3. Storybook (with HMR ready)
4. Turborepo integration
5. Ready for grpc-web front end development
6. Example all 100% in Typescript
7. React v18

## How to use this template

Clone this repo and degit the repo
```sh
npx degit
```

Make sure you have Yarn v4, install yarn v4
```sh
npm install -g yarn
yarn set version berry

# You can check the installed version of Yarn by running:
yarn --version
```

Install all dependencies by using 
```sh
yarn install
```

Generate grpc web source by using protobuf-ts and proto-gen.js
```sh
yarn proto-gen
```

If you want to changes package scope to your own scopes.
Here how can you changed it :

```sh

# if you want to use your own scopes
# you can changes the @sharedscope 
@sharedscope -> @yourscope

# change all package.json
# core,api and ui
@sharedscope/core -> @yourscope/core
@sharedscope/api -> @yourscope/api
@sharedscope/ui -> @yourscope/ui

# dont forget to change the devDependencies, dependencies or peerDependencies to
@sharedscope/core -> @yourscope/core
@sharedscope/api -> @yourscope/api
@sharedscope/ui -> @yourscope/ui

# change your package.json workspaces value in root package.json
 "workspaces": [
    "web",
    "@sharedscope/*"
  ],

# into

 "workspaces": [
    "web",
    "@yourscope/*"
  ],

# change also the storybook config on .storybook folder
const config: StorybookConfig = {
  stories: ["../@sharedscope/*/stories/**/*.mdx", "../@sharedscope/*/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  
# into 

const config: StorybookConfig = {
  stories: ["../@yourscope/*/stories/**/*.mdx", "../@yourscope/*/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  

```
### Available Task & Scripts

- `start` : start `web` in development mode.
- `build`: build `web` for deployment.
- `test` : run `jest` unit test for `web`.
- `storybook` : run storybook.
- `storybook-build` : build storybook.
- `build-lib` : build all shared packages/library.
- `test-lib` : test all shared packages/library using `jest`.
- `build-all`: build all packages/library & web.
- `test-all` : run jest on all packages/library & web.
- `proto-gen` : generate grpc web source in Typescript using proto-gen.js.
- `clean-lib` : clean 'dist' on all shared packages/library.
- `clean` : clean 'dist' on web.
- `clean-all` : clean all 'dist'
- `reset-ws` : remove all 'dist' and all node_modules, after this you should run `yarn install`.


### Packages and App
- `@sharedscope/core` : TS shared libray
- `@sharedscope/api` : Grpc-web implementation
- `@sharedscope/ui` : React UI Component library
- `web` : main web react vite app
- `.storybook` : config for storybook

