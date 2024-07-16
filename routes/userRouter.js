const Router = require('express')
const router = new Router()

router.get('/auth')
router.post('/login')
router.post('/registration')


module.exports = router