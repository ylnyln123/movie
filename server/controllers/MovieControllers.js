const { Movie } = require('../models')

module.exports = {
  async create (req, res) {
    try {
      const movie = await Movie.create(req.body)
      res.status(201).send({
        code: 200,
        user: movie.toJSON()
      })
    } catch (error) {
      // eslint-disable-next-line prefer-const
      let err = []
      if (error.errors) {
        error.errors.forEach(validateError => {
          err.push(validateError.message)
        })
      } else {
        err.push('数据保存失败，请重试')
      }
      res.status(400).send({
        code: 400,
        error: err.join('<br/>')
      })
    }
  },

  // 查询用户
  async getById (req, res) {
    try {
      const movie = await Movie.findByPk(req.params.id)
      if (movie) {
        res.status(200).send({
          movie
        })
      } else {
        res.status(400).send({
          code: 400,
          error: '没有找到对应用户，或许是没有该用户'
        })
      }
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据查询失败'
      })
    }
  },

  // 修改用户
  async update (req, res) {
    try {
      await Movie.update(
        req.body,
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.status(200).send({
        massage: '数据更新成功'
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据更新失败'
      })
    }
  },
  async getAll (req, res) {
    try {
      const movies = await Movie.findAll()
      res.send({
        code: 200,
        movies: movies
      })
    } catch (error) {
      res.status(400).send({
        code: 400,
        error: '没有找到对应数据'
      })
    }
  },
  // 删除用户
  async delete (req, res) {
    try {
      await Movie.destroy(
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.status(200).send({
        massage: '数据删除成功'
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        error: '数据删除失败'
      })
    }
  }
}
