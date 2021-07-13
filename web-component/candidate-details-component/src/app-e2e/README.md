<p align="center">
  <img alt="TravelClick" src="https://static-tx.travelclick.com/tc-images/logo/travelclick-new-logo-wide.png" />
  <h1 align="center">Cypress e2e Test Cases <img height="20" width="20" src="https://github.githubassets.com/images/icons/emoji/unicode/1f44b.png"></h1>
</p>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-12.14.1-blue.svg" />
  <img src="https://img.shields.io/badge/npm-6.13.4-blue.svg" />
</p>

> Source code and setup for writing **Cypress e2e test cases for Web Component**
>
> This is designed to help developers jump start with e2e test case writing for web components without spending time in identifying basic setup and plugins required.
>
> The boilerplate comes equipped with basic dependencies required for development.
>
> Please follow the Installation steps as mentioned below
>

## Pre-Requisites

- [![node](https://img.shields.io/badge/node-%3E%3D%2012.14.1-4CB944.svg)](https://nodejs.org/download/release/v12.14.1/)
- [![npm](https://img.shields.io/badge/npm-%3E%3D%206.13.4-4DDAA4.svg)](https://nodejs.org/download/release/v12.14.1/)

## Author

<img height="16" width="16" src="https://github.githubassets.com/images/icons/emoji/unicode/1f464.png"> **TravelClick**

## Development - Standard and Guidelines Document

## Project structure

The folder structure plays a big part in the build process. The current default layout is as mentioned

## Dev Dependencies
- [cypress](https://ghub.io/cypress): Cypress.io end to end testing tool

## Install

  ```sh
    npm install
  ```

## Run tests

### Before executing the test cases, you have to make sure the application is running. If not please run the application first and then follow below steps

  ```sh
    npm run e2e-run
    // This will run all the test cases with headless browser.
    // The default headless browser used is electron

    npm run e2e-open
    // This will run all the test cases in the default browser.

  ```
