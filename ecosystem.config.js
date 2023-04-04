module.exports = {
  apps: [
    {
      name: 'api',
      exec_mode: 'cluster',
      // exec_mode: 'cluster',
      // script: 'yarn',
      script: './dist/src/main.js',
      args: 'prod'
    }
  ]
}
