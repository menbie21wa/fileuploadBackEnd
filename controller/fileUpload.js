const EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.uploadImage = (req, res, next) => {
  var workflow = new EventEmitter();
  let fileData = req.files;

  workflow.on('validateData', () => {
    if (fileData === '' || fileData === undefined || fileData == {}) {
      return res.status(400).json({
        message: 'እባክዎ ፋይልዎን ያስገቡ',
      });
    } else {
      if (
        fileData &&
        fileData.ruleRegulation &&
        fileData.ruleRegulation[0].fieldname !== ''
      ) {
        fileData.ruleRegulation = fileData.ruleRegulation[0].filename;
      }
      if (
        fileData &&
        fileData.businessName &&
        fileData.businessName[0].fieldname !== ''
      ) {
        fileData.businessName = fileData.businessName[0].filename;
      }
      if (
        fileData &&
        fileData.agreement &&
        fileData.agreement[0].fieldname !== ''
      ) {
        fileData.agreement = fileData.agreement[0].filename;
      }
      if (
        fileData &&
        fileData.registrationLicense &&
        fileData.registrationLicense[0].fieldname !== ''
      ) {
        fileData.registrationLicense = fileData.registrationLicense[0].filename;
      }
      if (
        fileData &&
        fileData.businessLicense &&
        fileData.businessLicense[0].fieldname !== ''
      ) {
        fileData.businessLicense = fileData.businessLicense[0].filename;
      }
      if (
        fileData &&
        fileData.taxPayerID &&
        fileData.taxPayerID[0].fieldname !== ''
      ) {
        fileData.taxPayerID = fileData.taxPayerID[0].filename;
      }
      if (
        fileData &&
        fileData.legalReceipts &&
        fileData.legalReceipts[0].fieldname !== ''
      ) {
        fileData.legalReceipts = fileData.legalReceipts[0].filename;
      }
      if (
        fileData &&
        fileData.professionalLicense &&
        fileData.professionalLicense[0].fieldname !== ''
      ) {
        fileData.professionalLicense = fileData.professionalLicense[0].filename;
      }
      if (
        fileData &&
        fileData.accountCheck &&
        fileData.accountCheck[0].fieldname !== ''
      ) {
        fileData.accountCheck = fileData.accountCheck[0].filename;
      }
      if (
        fileData &&
        fileData.acceptedProject &&
        fileData.acceptedProject[0].fieldname !== ''
      ) {
        fileData.acceptedProject = fileData.acceptedProject[0].filename;
      }
      if (fileData && fileData.logo && fileData.logo[0].fieldname !== '') {
        fileData.logo = fileData.logo[0].filename;
      }
      if (fileData && fileData.avatar && fileData.avatar[0].fieldname !== '') {
        fileData.avatar = fileData.avatar[0].filename;
      }
      if (
        fileData &&
        fileData.studyDesign &&
        fileData.studyDesign[0].fieldname !== ''
      ) {
        fileData.studyDesign = fileData.studyDesign[0].filename;
      }
      if (
        fileData &&
        fileData.planForm &&
        fileData.planForm[0].fieldname !== ''
      ) {
        fileData.planForm = fileData.planForm[0].filename;
      }
      if (
        fileData &&
        fileData.payrollForm &&
        fileData.payrollForm[0].fieldname !== ''
      ) {
        fileData.payrollForm = fileData.payrollForm[0].filename;
      }
      if (
        fileData &&
        fileData.paymentOrderForm &&
        fileData.paymentOrderForm[0].fieldname !== ''
      ) {
        fileData.paymentOrderForm = fileData.paymentOrderForm[0].filename;
      }
      if (
        fileData &&
        fileData.contractForm &&
        fileData.contractForm[0].fieldname !== ''
      ) {
        fileData.contractForm = fileData.contractForm[0].filename;
      }
      if (
        fileData &&
        fileData.images &&
        fileData.images[0].fieldname !== ''
      ) {
        fileData.images = fileData.images[0].filename;
      }
      if (
        fileData &&
        fileData.workExperience &&
        fileData.workExperience[0].fieldname !== ''
      ) {
        fileData.workExperience = fileData.workExperience[0].filename;
      }
      
      workflow.emit('respond', fileData);
    }
  });

  workflow.on('respond', (fileData) => {
    res.status(200).json(fileData);
  });

  workflow.emit('validateData');
};
