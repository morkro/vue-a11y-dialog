module.exports = {
  presets: ['env'],
  env: {
    test: {
      presets: [
        ['env', { targets: { node: 'current' }}]
      ]
    }
  }
}
