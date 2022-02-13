const { resetWatchers } = require('nodemon/lib/monitor/watch');
var Userdb = require('../model/model');

//create and save new user

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Please fill the fields' });
    return;
  }
  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  //Save user
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some erro occured',
      });
    });
};

//retriveve and return all user /  retrieve and returnuser

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: 'Not Fond user sith id' + id });
        } else {
          res.send(data);
        }
      })

      .catch(err => {
        res.status(500).send({
          message: 'Error Retrieving user with id' + id,
        });
      });
  } else {
    Userdb.find()
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        res.status(500).send({ message: err.message || 'some error' });
      });
  }
};

//Update user and return all user /  retrieve and returnuser

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update cannot be empty' });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}, Maybe User not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error Update Message',
      });
    });
};

//Update user and return all user /  retrieve and returnuser
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then(data => {
      if (data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id} Maybe id is Wrong` });
      } else {
        res.send({ message: 'User Was deleted successfully' });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delte User with id  ${id} `,
      });
    });
};
