const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Calendar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:200,300,400' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' }
  /*
  ** Build configuration
  */
}
