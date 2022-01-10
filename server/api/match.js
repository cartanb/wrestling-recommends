const router = require('express').Router()
const db = require('../db')

router.get('/', async (req, res, next) => {
  const result = await db
    try {
      const queryResult = await db.session().run(
        'MATCH (m:Match) RETURN m.name'
      )
      const parsedResult = queryResult.records.map((record) => record.get(0))
      res.json(parsedResult)
    } catch (error) {
      next(error)
    } finally {
      await db.session().close()
    }
})

router.get('/results', async (req, res, next) => {
  const result = await db
    try {
      const queryResult = await db.session().run(
        'MATCH (startMatch:Match) WHERE apoc.text.urldecode(startMatch.name) = $matchName WITH startMatch MATCH (startMatch)-[:WORKED]-()-[:WORKED]-(newMatch:Match) WHERE startMatch <> newMatch WITH startMatch, apoc.number.parseFloat(startMatch.rating) AS startRating, newMatch, apoc.number.parseFloat(newMatch.rating) AS newRating RETURN newMatch.name, newMatch.id, abs(startRating - newRating) AS distance, count(newMatch) as inCommon ORDER BY distance, inCommon DESC',
        { matchName: req.query.m }
      )
      const parsedResult = queryResult.records.map((record) => [record.get(0), record.get(1)])
      res.json(parsedResult)
    } catch (error) {
      next(error)
    } finally {
      await db.session().close()
    }
})

module.exports = router
