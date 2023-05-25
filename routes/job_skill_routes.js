var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');

var jobSkillController = require('../controller/jobSkill');

router.post('/create', jobSkillController.createJobSkill);

router.get('/all', jobSkillController.fetchAll);

router.get('/paginate', jobSkillController.fetchAllByPagination);

router.get('/search', jobSkillController.search);

router.get('/:id', jobSkillController.fetchOne);

router.put(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),
  jobSkillController.update
);
router.delete(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),
  jobSkillController.remove
);

// Expose User Router
module.exports = router;
