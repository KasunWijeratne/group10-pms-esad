export const roles = [{
    title: 'Super Admin',
    value: 'SA',
}, {
    title: 'Account Manager',
    value: 'ACC_MANAGER',
}, {
    title: 'Site Manager',
    value: 'SITE_MANAGER',
}, {
    title: 'Account Staff',
    value: 'ACC_STAFF',
}, {
    title: 'Procurement Staff',
    value: 'PROC_STAFF',
}]

export const authRoles = {
    sa: ['SA'],
    acc_manager: ['SA', 'ACC_MANAGER'],
    site_manager: ['SA', 'SITE_MANAGER'],
    acc_staff: ['SA', 'ACC_MANAGER', 'ACC_STAFF'],
    proc_staff: ['SA', 'SITE_MANAGER', 'PROC_STAFF'],
    full: roles.map((role) => role.value),
}
