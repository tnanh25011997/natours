const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

router.post('/updateMyPassword', authController.protect, authController.updatePassword);

router
  .route('/')
  .get(authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
