import Sequelize from 'sequelize';
import express from 'express';
import user from '../db/models/user';

const router = express.Router();
//instalar npm install -g ts-node
//instalar npm install -g typescript
//instalar npm install -g nodemon
//instalar npm install -g sequelize-cli
//instalar npm install -g mysql2
//instalar npm install -g dotenv

router.get('/user/:id', async function (req, res, next) {
  const { id } = req.params
  console.log(id)
  const userFound = await user.findByPk(id);

  if (userFound) {
    res.status(200).json(userFound);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.post('/user', async function (req, res, next) {
  const { name, last_name, age } = req.body

  await user.create({
    name: name,
    last_name: last_name,
    age: age,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(() => {
    res.status(201).json({ message: 'User created' });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

export default router;