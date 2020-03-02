const router = require('express').Router();
const shadowsController = require('../controllers/shadowsController');

router.get('/', shadowsController.index);
router.get('/manage', shadowsController.manage);
router.get('/:thingName', shadowsController.show);
router.put('/:thingName/:action', shadowsController.update);

module.exports = router;
