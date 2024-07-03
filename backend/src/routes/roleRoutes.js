const express = require('express')
const router = express.Router()
const roleController = require('../controller/roleController')

router.get('/', roleController.getAllRoles)
router.get('/:id', roleController.getRoleById)
router.post('/', roleController.createRol)
router.put('/:id', roleController.updateRol)
router.delete('/:id', roleController.deleteRol)

module.exports = router