# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

- tbd

## [1.1.2] 2022-04-02

### Changed

- Updates `alertdialog` to be conditionally applied [#39](https://github.com/morkro/vue-a11y-dialog/pull/39) (Thanks to [@roblevintennis](https://github.com/roblevintennis))

## [1.1.1] 2022-01-24

### Removed

- Remove obsolete concept of app root [#37](https://github.com/morkro/vue-a11y-dialog/pull/37) (Thanks to [@KittyGiraudel](https://github.com/KittyGiraudel))

## [1.1.0] 2022-01-24

### Added

- Build setup now done with Vite [#31](https://github.com/morkro/vue-a11y-dialog/pull/31) (Thanks to [@roblevintennis](https://github.com/roblevintennis))
- Demo configuration to run locally
- Added ESM build output

### Changed

- Updated `a11y-dialog` to latest version [#31](https://github.com/morkro/vue-a11y-dialog/pull/31) (Thanks to [@roblevintennis](https://github.com/roblevintennis))
- Updated development dependencies

## [1.1.0] 2022-01-24

### Added

- Build setup now done with Vite [#31](https://github.com/morkro/vue-a11y-dialog/pull/31) (Thanks to [@roblevintennis](https://github.com/roblevintennis))
- Demo configuration to run locally
- Added ESM build output

### Changed

- Updated `a11y-dialog` to latest version [#31](https://github.com/morkro/vue-a11y-dialog/pull/31) (Thanks to [@roblevintennis](https://github.com/roblevintennis))
- Updated development dependencies
- Tests now done with Cypress [#31](https://github.com/morkro/vue-a11y-dialog/pull/31) (Thanks to [@roblevintennis](https://github.com/roblevintennis))
- More updates to Vue 3 setup (e.g. `emits`) (Note to [#30](https://github.com/morkro/vue-a11y-dialog/pull/30))

### Removed

- Jest
- Rollup (now under-the-hood configuration via Vite)

## [1.0.0] - 2021-02-21

This is the first major release that introduces breaking changes. From `1.0.0` onwards the API will support Vue 3.

### Changed

- Updated API to support Vue 3 syntax [#25](https://github.com/morkro/vue-a11y-dialog/pull/25) (Thanks to [@marcus-herrmann](https://github.com/marcus-herrmann))

### Removed

- Removed dependency to `portal-vue`

## [0.5.2] - 2020-04-14

### Changed

- Updated `a11y-dialog` to latest version

### Fixed

- Fixes mistakenly used `titleId` in `aria-labelledby` with `fullTitleId` ([#23](https://github.com/morkro/vue-a11y-dialog/pull/23))

## [0.5.1] - 2020-02-12

### Changed

- Changed three minor occurences of arrow functions with normal functions to allow support for IE11.
- Updated a few dependencies, including latest `portal-vue` release

### Security

- Ran `npm audit` and fixed a couple vulneribility warnings.

## [0.5.0] - 2019-04-16

### Changed

- Upgraded to `portal-vue@2.1.0` which required refactoring parts of the implementation.
- Upgraded development dependencies.

## [0.4.2] - 2019-02-21

### Fixed

- Vue.js library from being included to the bundle.

## [0.4.1] - 2019-02-20

### Added

- This CHANGELOG.
- Some basic component tests.

### Changed

- Upgraded dependencies which resulted in a new bundle.
- Updated README to use new `v-slot` syntax.

### Fixed

- Mistake in API documentation of `title` slot.

## [0.4.0] - 2018-12-14

## Added

- [PortalVue](https://github.com/LinusBorg/portal-vue) to render the dialog outside of the application container, addressing [#5](https://github.com/morkro/vue-a11y-dialog/issues/5).

## [0.3.1] - 2018-06-03

### Security

- Removes full component file path from development environment in bundled output.

## [0.3.0] - 2018-06-03

### Added

- Adds possibility to use `alertdialog` role.

## [0.2.0] - 2018-06-16

### Added

- New API to disable the native `<dialog>` element.

### Changed

- Upgrades to `a11y-dialog@5.1.0`.

## [0.1.0] - 2018-06-13

### Added

- Everything.
