import { Router } from 'express'

import wiki from './wiki'

var router = Router()

// Add Routes
router.use(wiki)

export default router
