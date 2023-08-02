const port = "http://localhost:3000";
// admin api
export const LoginApi = `${port}/login`;
export const AuthApi = `${port}/auth`;
export const GetAllAdminApi = `${port}/admins`;
export const GetAdminApi = `${port}/admin/`; //admin/:admin_id
export const createAdminApi = `${port}/admins`;
export const updateAdminApi = `${port}/admin/`; //admin/:admin_id
export const delAdminApi = `${port}/admin/`; //admin/:admin_id

//advisor
export const getAllAdvisor = `${port}/advisors`;
export const getAdvisor = `${port}/advisor/`; //advisor/:advisor_id
export const createAdvisor = `${port}/advisors`;
export const UpdateAdvisor = `${port}/advisor/`; //advisor/:advisor_id
export const delAdvisor = `${port}/advisor/`; //advisor/:advisor_id

//cooperative
export const getAllCoop = `${port}/cooperatives`;
export const getCoop = `${port}/cooperative/`;
export const createCoop = `${port}/cooperatives`; //by row
export const updateCoop = `${port}/cooperative/`;
export const delCoop = `${port}/cooperative/`;
export const uploadCoop = `${port}/coop/upload`;

//report type
export const getRepType = `${port}/reporttypes`;

//report
export const getAllReport = `${port}/reports`;
export const getReport = `${port}/report/`;
export const CreateReport = `${port}/reports`;
export const updateReport = `${port}/report/`;
export const delReport = `${port}/report/`;
export const uploadReport = `${port}/api/upload`;
export const loanReport = `${port}/loanReport/`;
export const reportCount = `${port}/reports/count`;


//loan
export const getAllLoan = `${port}/loans`;
export const getLoan = `${port}/loan/`;
export const createLoan = `${port}/loans`;
export const updateLoan = `${port}/loan/`;
export const delLoan = `${port}/loan/`;
export const loanReturn = `${port}/return/`;



