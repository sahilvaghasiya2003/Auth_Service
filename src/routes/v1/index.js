const express = require("express");
const userController = require("../../controllers/user-controller");
const { AuthRequestValidator } = require("../../middleware/index");
const router = express.Router();

router.post("/signup", AuthRequestValidator.validateUserAuth, userController.create);
router.post("/signin", AuthRequestValidator.validateUserAuth, userController.signIn);
router.get('/isAuthenticated',userController.isAuthenticated)
// router.get('/dummy',(req,res)=>{
//     return res.status(200).json({message : ok})
// })

module.exports = router;
