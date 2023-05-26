const express = require('express');
const router = express.Router();

var tefController = require('../controller/tef_wof');

const Authentication = require('../lib/authenticate');
const Authorization = require('../lib/authorization');

router.post(
  '/create',
  Authentication,
  Authorization(['super_admin', 'admin', 'user']),
  tefController.createTef_Wof
);

router.get('/all', tefController.fetchAll);
router.get('/:id', tefController.fetchOne);
router.delete('/:id', tefController.remove);
router.put(
  '/:id',
  Authentication,
  Authorization(['super_admin', 'admin', 'user', 'customer']),

  tefController.update
);
// Expose User Router
module.exports = router;
