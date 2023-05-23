
const organizationRouter = require('./organization_routes');
const projectofficeRouter = require('./projectoffice_routes');
const trainingRouter = require('./training_routes');
const promotionRouter = require('./promotion_routes');
const jobskillRouter = require('./job_skill_routes');
const planRouter = require('./plan_routes');
const propertyRouter = require('./property_routes');
const legalityRouter = require('./legality_routes');
const fileuploadRouter = require('./fileupload_routes');

const userRouter  = require('./users_routes');
const tefRouter  = require('./tef_wof_routes');
const hasabRouter   = require('./hasab_routes');
const productRouter   = require('./product_routes');
const product_specificationRouter   = require('./product_specification');
const categoryRouter =require('./category_routes');

module.exports = (app) => {
 
  app.use('/addressapi/organizations', organizationRouter);
  app.use('/addressapi/projectoffice', projectofficeRouter);
  app.use('/addressapi/trainings', trainingRouter);
  app.use('/addressapi/promotions', promotionRouter);
  app.use('/addressapi/jobskills', jobskillRouter);
  app.use('/addressapi/plans', planRouter);
  app.use('/addressapi/legality', legalityRouter);
  app.use('/addressapi/property', propertyRouter);
  app.use('/addressapi/files', fileuploadRouter);

  app.use('/addressapi/users', userRouter);
  app.use('/addressapi/tef_wof', tefRouter);
  app.use('/addressapi/hasab', hasabRouter);
  app.use('/addressapi/product', productRouter);
  app.use('/addressapi/product_specification', product_specificationRouter);
  app.use('/addressapi/category', categoryRouter);
};
