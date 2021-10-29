import Mock from './mock'

import './db/auth'
import './db/requisitions'
import './db/materials'
import './db/suppliers'
import './db/order'
import './db/delivery'
import './db/users'

Mock.onAny().passThrough()
