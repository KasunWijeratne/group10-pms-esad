import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import RequisitionReducer from './RequisitionReducer'
import GlobalReducer from './GlobalReducer'
import MaterialReducer from './MaterialRecuder'
import SupplierReducer from './SupplierReducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    requisition: RequisitionReducer,
    material: MaterialReducer,
    supplier: SupplierReducer,
    global: GlobalReducer,
})

export default RootReducer
