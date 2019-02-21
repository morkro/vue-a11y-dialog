# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
