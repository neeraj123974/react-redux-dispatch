import express from 'express'
import LockController from './../controllers/LockController'

const router = express.Router()

const baseUrl = '/auth'

router.post(baseUrl + '/createLock',   LockController.createLock)
router.get(baseUrl + '/getLock',   LockController.getLock)
router.post(baseUrl + '/deleteLock',   LockController.deleteLock)
router.put(baseUrl + '/editLock',   LockController.editLock)

export default router