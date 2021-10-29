import { combineReducers } from 'redux'
import NavigationReducer from './NavigationReducer'
import RequisitionReducer from './RequisitionReducer'
import GlobalReducer from './GlobalReducer'
import MaterialReducer from './MaterialRecuder'
import SupplierReducer from './SupplierReducer'
import OrderReducer from './OrderReducer'
import DeliveryReducer from './DeliveryReducer'
import UserReducer from './UserReducer'

const RootReducer = combineReducers({
    navigations: NavigationReducer,
    requisition: RequisitionReducer,
    material: MaterialReducer,
    supplier: SupplierReducer,
    order: OrderReducer,
    delivery: DeliveryReducer,
    global: GlobalReducer,
    users: UserReducer,
})

export default RootReducer
