module.exports = {
  db: {
    database: process.env.DATABASE || 'movie',
    username: 'root',
    password: '123456',
    options: {
      host: 'localhost',
      dialect: 'mysql',
      // storage: path.resolve(__dirname, './../db/movie.mysql'),
      define: {
        underscored: true,
        paranoid: true
      }
    }
  },
  token: {
    secretOrPrivateKey: 'movie',
    options: {
      expiresIn: '24h'
    }
  }
}
