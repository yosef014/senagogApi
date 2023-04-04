module.exports = {
  apps: [
    {
      name: 'api',
<<<<<<< HEAD
      exec_mode: 'cluster',
=======
      exec_mode: 'fork',
>>>>>>> 1b1fdc8943355d2ee584843d3b7df020d8410323
      // exec_mode: 'cluster',
      // script: 'yarn',
      script: './dist/src/main.js',
      args: 'prod'
    }
  ]
}
