var EventEmitter = require('events').EventEmitter;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const UserDal = require('../dal/user');

hashUserPassword = (password) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return {
        message: 'Server error',
      };
    }
    //console.log("hash",hash)
    return hash;
  });
};

generateRandomNumber = (digit) => {
  console.log('generating number...');

  let number_digit = '1';
  let multiplier = '9';

  for (let index = 1; index < digit; index++) {
    number_digit += '0';
    multiplier += '9';
  }

  //console.log(number_digit, multiplier);
  let generatedNumber = Math.floor(
    Number(number_digit) + Math.random() * Number(multiplier)
  );

  //console.log("returning ", generatedNumber);
  return String(generatedNumber).substring(0, digit);
};

exports.createUser = (req, res, next) => {
  var workflow = new EventEmitter();

  var userData = req.body;

  workflow.on('validateUserData', (userData) => {
    if (!userData.firstName) {
      return res.status(400).json({
        message: 'ስም ማስገባት አለብዎት',
      });
    }
    if (!userData.middleName) {
      return res.status(400).json({
        message: 'ያባት ስም ማስገባት አለብዎት',
      });
    }
    if (!userData.email || userData.email === '') {
      return res.status(400).json({
        message: 'ኢሜል ማስገባት አለብዎት',
      });
    }
    if (!userData.password || userData.password === '') {
      return res.status(400).json({
        message: 'የይለፍ ቃል ማስገባት አለብወት',
      });
    }
    if (!userData.sex && userData.sex === '') {
      return res.status(400).json({
        message: 'ጾታ ማስገባት አለብዎት',
      });
    }
    workflow.emit('checkUserExist', userData);
  });
  workflow.on('checkUserExist', (userData) => {
    let userQuery = {
      where: {
        email: userData.email,
      },
    };
    UserDal.get(userQuery, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!user) {
        workflow.emit('hashPassword', userData);
      } else {
        return res.status(400).json({
          message: 'ካሁን በፊት ተመዝግበዋል',
        });
      }
    });
  });
  workflow.on('hashPassword', (userData) => {
    bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      userData.password = hash;
      workflow.emit('createUser', userData);
    });
  });
  workflow.on('createUser', (userData) => {
    let user_code = generateRandomNumber(6);
    userData['userCode'] = user_code;

    UserDal.create(userData, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', user);
    });
  });
  workflow.on('respond', (user) => {
    if (user?.password) delete user?.password;
    res.status(201).json({
      user: user,
      message: 'በትክክል ተመዝግበዋል',
    });
  });
  workflow.emit('validateUserData', userData);
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  let searchKey =
    ({},
    {
      include: [
        {
          model: tef_wof,
        },
      ],
    });
  if (req?.query?.key) {
    searchKey = req.query.key.toLowerCase();
  } else {
    searchKey = undefined;
  }

  workflow.on('fetchAllUsers', () => {
    UserDal.getCollection(searchKey, (err, users) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
        return;
      }
      if (users && users.length > 0) {
        workflow.emit('respond', users);
      } else {
        res.status(400).json({
          message: 'Users not found',
        });
        return;
      }
    });
  });

  workflow.on('respond', (users) => {
    // users?.map(_user=>{
    //  delete _user?.dataValues.password
    // })
    res.status(200).json(users);
  });

  workflow.emit('fetchAllUsers');
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('fetchUser', () => {
    UserDal.getByPk(id, (err, user) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      if (user && Object.keys(user).length > 0) {
        workflow.emit('respond', user);
      } else {
        res.status(400).json({
          message: 'ባስገቡት መረጃ የተመዘገበ ሰው የለም',
        });
        return;
      }
    });
  });

  workflow.on('respond', (user) => {
    delete user.password;
    res.json(user);
  });

  workflow.emit('fetchUser');
};

exports.remove = (req, res, next) => {
  console.log('Archiving user:' + req.params.id);

  var workflow = new EventEmitter();

  workflow.on('findUser', () => {
    UserDal.getByPk(req.params.id, (err, user) => {
      if (err) {
        res.satus(500).json({
          name: 'SERVER_ERROR',
          message: err.message,
        });
        return;
      }
      if (!user) {
        res.status(400).json({
          name: 'DELETE_USER_ERROR',
          message: 'User Data Not Found',
        });
        return;
      }

      workflow.emit('deleteUser', user);
    });
  });

  workflow.on('deleteUser', (user) => {
    UserDal.delete(user.id, (err, deletedUser) => {
      if (err) {
        res.status(500).json({
          name: 'DELETE_USER_ERROR',
          message: err.message,
        });
        return;
      }

      if (deletedUser || Object.keys(deletedUser).length > 0) {
        workflow.emit('respond', deletedUser);
      } else {
        res.status(400).json({ message: 'User not found' });
        return;
      }
    });
  });

  workflow.on('respond', (user) => {
    res
      .status(200)
      .json({ message: `User with id ${user.id} deleted successfully.` });
    return;
  });

  workflow.emit('findUser');
};

exports.update = (req, res, next) => {
  let workflow = new EventEmitter();
  let { id } = req?.params;
  let _user = req?._user;
  let image_path = '';

  workflow.on('fetchUser', (updatePayload) => {
    UserDal.getByPk(id, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!user) {
        return res.status(400).json({
          message: 'ባስገቡት መረጃ የተመዘገበ ሰው የለም',
        });
      }
      if (Number(_user?.id) === Number(id)) {
        workflow.emit('updateUser', user, updatePayload);
      } else {
        return res.status(401).json({
          message: 'ለርስዎ ያልተፈቀደ',
        });
      }
    });
  });
  workflow.on('updateUser', (user, updatePayload) => {
    if (updatePayload.avatar && user.avatar) {
      fs.readdir(`./images`, (error, fileNames) => {
        if (error) throw error;
        if (fileNames.includes(user.avatar)) {
          image_path = `./images/${user.avatar}`;
        }
        return;
      });
    }

    let updateQuery = {
      where: { id: user.id },
    };

    UserDal.update(updatePayload, updateQuery, (err, updated_user) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (image_path) {
        fs.unlink(image_path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      if (updated_user.length > 0) {
        workflow.emit('getUpdatedData', user);
      } else {
        return res.status(400).json({
          message: 'አልተሳካም እንደገና ይሞክሩ',
        });
      }
    });
  });
  workflow.on('getUpdatedData', (updated_user) => {
    UserDal.getByPk(id, (err, userUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', userUpdated);
    });
  });
  workflow.on('respond', (userUpdated) => {
    if (userUpdated && userUpdated.password) delete userUpdated.password;
    res.status(200).json({
      userUpdated,
      message: 'ያስገቡት መረጃ በትክክል ተቀይሮል',
    });
  });

  let updatePayload = req.body;

  if (!updatePayload) {
    return res.status(400).json({
      message: 'ምንም መረጃ አላስገቡም',
    });
  }
  if (updatePayload.userCode) {
    return res.status(400).json({ message: 'አፕዴት የማይደረግ ዳታ ልከዋል' });
  } else if (updatePayload.password) {
    return res.status(400).json({ message: 'አፕዴት የማይደረግ ዳታ ልከዋል' });
  } else if (updatePayload.role) {
    return res.status(400).json({ message: 'አፕዴት የማይደረግ ዳታ ልከዋል' });
  }
  // let extension = '';
  // var ext_indx = updatePayload.avatar.lastIndexOf('.');
  // if (ext_indx > 0) {
  //   extension = updatePayload.avatar.substr(ext_indx);
  // }

  workflow.emit('fetchUser', updatePayload);
};

exports.search = (req, res, next) => {
  let workflow = new EventEmitter();

  let page = req.query.page || 1;
  let limit = req.query.per_page || 10;

  var opts = {
    page: page,
    limit: limit,
    sort: { createdAt: -1 },
  };

  workflow.on('prepareSearchQuery', () => {
    if (req.query.key && req.query.key !== '') {
      let searchKey = String(req.query.key).toLowerCase();

      workflow.emit('searchUsers', searchKey);
    } else {
      res.status(400).json({ message: 'Search key not found' });
      return;
    }
  });
  workflow.on('searchUsers', (searchKey) => {
    UserDal.search(searchKey, opts, (err, users) => {
      if (err) {
        res.status(500).json({
          message: 'SERVER_ERROR',
        });
        return;
      }
      workflow.emit('respond', users);
    });
  });

  workflow.on('respond', (users) => {
    if (users?.length > 0)
      users.map((_user) => delete _user?.dataValues.password);

    res.status(200).json(users);
    return;
  });

  workflow.emit('prepareSearchQuery');
};

exports.userLogin = (req, res, next) => {
  console.log('User login');

  var workflow = new EventEmitter();

  var userData = req.body;

  workflow.on('validateData', (userData) => {
    if (!userData.email || !userData.password) {
      res.status(400).json({ message: 'እባክዎት ሁሉንም አስፈላጊ መረጃወች ይሙሉ' });
      return;
    }

    let userQuery = {
      where: {
        email: userData.email,
      },
    };

    UserDal.get(userQuery, (err, user) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      if (!user) {
        res.status(400).json({
          message: 'በዚህ ኢሜል የተከፈተ አካውንት የለም አክውንት መክፈትዎን ያረጋግጡ',
        });
        return;
      }
      bcrypt.compare(userData.password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
          };
          jwt.sign(
            payload,
            process.env.API_SECRETE,
            {
              expiresIn: 10800,
            },
            (err, token) => {
              if (err) {
                return;
              }

              user['token'] = token;

              workflow.emit('respond', token, user);
            }
          );
        } else {
          res.status(400).json({
            message: 'የይለፍ ቃል ስለተሰሳቱ ትክክለኛ የይለፍ ቃል ያስገቡ',
          });
          return;
        }
      });
    });
  });
  workflow.on('respond', (token, user) => {
    delete user?.password;
    user.token = token;
    res.status(200).json(user);
    return;
  });

  workflow.emit('validateData', userData);
};
