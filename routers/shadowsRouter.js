const router = require('express').Router();
const shadowsController = require('../controllers/shadowsController');

router.get('/', shadowsController.index);
router.get('/:thingName', shadowsController.show);
router.post('/:thingName/:action', shadowsController.update);

module.exports = router;
