
const eplusappRouter = require('./eplusappFile_routes');
const fileuploadRouter =require('./fileupload_routes');

module.exports = (app) => {
 
  app.use('/fileupload-api/eplusapp', eplusappRouter);
  app.use('/fileupload-api/files', fileuploadRouter);
  // app.use('*',(req,res)=>{
  //   res.status(404).json({
  //     message:" data not found",
  //   })
  // })
};
