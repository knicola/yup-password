# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [next-version] - next-release-date
### Changed
* Switched to Typescript.

### Removed
* Deprecated method `.minRepeating()`.

## [0.3.0] - 2024-03-02
### Changed
* Bump `@types/jest` from 27.0.1 to 29.5.12
* Bump `eslint` from 7.32.0 to 8.57.0
* Bump `jest` from 27.0.6 to 29.7.0
* Bump `yup` from 0.32.9 to 1.3.3
* Rename `.minRepeating()` method to `.maxRepeating()`. The old method is deprecated and will be removed in a future release.

### Removed
* Deprecated methods `.minNumber()` and `.minSymbol()`.
* Unused `rollup` and `rollup-plugin-terser` dependencies.

## [0.2.2] - 2021-08-18
### Added
- ES6 `import` example to README file.
### Changed
- Bump `jest` from 26.6.3 to 27.0.6
- Bump `@types/jest` from 26.0.20 to 27.0.1
- Bump `yup` from 0.29.3 to 0.32.9
- Bump `eslint` from 7.18.0 to 7.32.0
- Bump `rollup` from 2.36.2 to 2.56.2

## [0.2.1] - 2021-02-12
### Fixed
- Fix API doc to include renamed methods and deprecation notices 🤦.

## [0.2.0] - 2021-02-11
### Added
- New method: `.minWords()` - requires a specified amount of words. Default is 2.
- More usage examples 🎉.
### Changed
- Start using "lowercase" over "lower-cased" and "uppercase" over "upper-cased" since it's the common usage.
### Fixed
- Usage example in readme file.
### Removed
- **BREAKING** `PasswordSchema` as it seems redundant and was broken with newer versions of `yup` anyway.
- Peer dependency to `yup`.
### Deprecated
- Method `.minNumber()` will be removed. Use `.minNumbers()` instead.
- Method `.minSymbol()` will be removed. Use `.minSymbols()` instead.

## [0.1.2] - 2021-01-16
### Changed
- Bump `@types/jest` from 26.0.19 to 26.0.20
- Bump `eslint` from 7.17.0 to 7.18.0
- Bump `rollup` from 2.35.1 to 2.36.2
### Fixed
- Fix "undefined" bug ([#2](https://github.com/knicola/yup-password/issues/2))

## [0.1.1] - 2021-01-03
### Added
- RollupJs build
### Changed
- Bump `@types/jest` from 26.0.15 to 26.0.19
- Bump `eslint` from 7.12.0 to 7.17.0
- Bump `jest` from 26.6.1 to 26.6.3
