export const authRoles = {
    sa: ['SA'],
    acc_manager: ['SA', 'ACC_MANAGER'],
    site_manager: ['SA', 'SITE_MANAGER'],
    account_staff: ['SA', 'ACC_MANAGER', 'ACC_STAFF'],
    proc_staff: ['SA', 'ACC_MANAGER', 'PROC_STAFF'],
    full: ['SA', 'ACC_MANAGER', 'SITE_MANAGER', 'ACC_STAFF', 'PROC_STAFF'],
}
