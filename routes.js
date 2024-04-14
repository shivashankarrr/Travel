const express = require('express');
const router = express.Router();
const auth_controller = require('./controller/auth_controller');
const user_controller = require('./controller/user_controller');
const traveldiary_controller = require('./controller/traveldiary_controller');
const authenticateToken = require('./middleware/jwttoken_middleware');

router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);

router.use(authenticateToken);
router.get('/profile', user_controller.profile);
router.put('/update_user', user_controller.update_user);

router.post('/travel_diary', traveldiary_controller.travel_diary);
router.get('/travel_diary', traveldiary_controller.getTravelDiariesByUserId);
router.delete('/travel_diary/:id', traveldiary_controller.deleteTravelEntry);
router.put('/travel_diary/:id', traveldiary_controller.updateTravelEntry);






module.exports = router;