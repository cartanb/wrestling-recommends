const router = require('express').Router()
const db = require('../db')

router.get('/', async (req, res, next) => {
  const result = await db
    try {
      const result = await db.session().run(
        'CALL apoc.search.node({Match: "name"}, "EXACT", $matchName) YIELD node AS startMatch WITH startMatch MATCH (startMatch)-[:WORKED]-()-[:WORKED]-(newMatch:Match) WHERE startMatch <> newMatch WITH startMatch, apoc.number.parseFloat(startMatch.rating) AS startRating, newMatch, apoc.number.parseFloat(newMatch.rating) AS newRating RETURN newMatch.name, abs(startRating - newRating) AS distance, count(newMatch) as inCommon ORDER BY distance, inCommon DESC',
        { matchName: req.query.match }
      )
      res.json(result)
    } catch (error) {
      next(error)
    } finally {
      await db.session().close()
    }
})

module.exports = router
