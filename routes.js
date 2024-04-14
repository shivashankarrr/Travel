const express = require('express');
const router = express.Router();
const auth_controller = require('./controller/auth_controller');
const user_controller = require('./controller/user_controller');
const authenticateToken = require('./middleware/jwttoken_middleware');

router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);

router.use(authenticateToken);
router.get('/profile', user_controller.profile);
router.put('/update_user', user_controller.update_user);


module.exports = router;