import { baseUrl } from "../configs/config";
export const portalEndPoints = {
  createAccount: `${baseUrl}user/create-account`,
  apply: `${baseUrl}user/add-applicationToUser`,
  createUser: `${baseUrl}user/create-user`,
  updateUser: `${baseUrl}user/update-user`,
getUser: `${baseUrl}user/get-users`,
  getUserById: `${baseUrl}user/get-user`,
  getAccounts: `${baseUrl}user/accounts`,
  addEducation: `${baseUrl}user/add-education-to-user`,
  deleteEducation: `${baseUrl}user/soft-delete-education/`,
  updateEducation: `${baseUrl}user/update-education`,
  restoreEducation: `${baseUrl}user/restore-education/`,
  getArchivedEducations: `${baseUrl}user/get-archived-educationsby-userId`,
  getEducationByUserId: `${baseUrl}user/get-education-by-userId`,
  getArchivedExperience: `${baseUrl}user/get-archived-experience-by-userId`,
getArchivedCertificates: `${baseUrl}user/get-archived-certificate-by-userId`,
getArchivedApplicationsByUserId: `${baseUrl}user/get-archived-application-by-userId`,
restoreCertificate: `${baseUrl}user/restore-certificate`,
restoreExperience: `${baseUrl}user/restore-experience`,
getApplicationDetail:`${baseUrl}user/get-application-detail`,
restoreApplication: `${baseUrl}user/restore-application/`,
archiveApplication: `${baseUrl}user/archive-application/`,
archiveEducation: `${baseUrl}user/soft-delete-education/`,
archiveCertificate:`${baseUrl}user/soft-delete-certificate/`,
archiveExperience:`${baseUrl}user/soft-delete-experience/`,
getApplicationByStatus:`${baseUrl}user/get-application-by-status`,
getApplicationByUserId:`${baseUrl}user/get-application-by-userId`,
getLicenseById:`${baseUrl}user/get-license-by-licenseId`,
getLicenseByApplicationId:`${baseUrl}user/get-license-by-applicationId`,
getEducationFileName:`${baseUrl}user/get-education-file-name-by-userId`,
getExperienceFileName:`${baseUrl}user/get-experience-file-name-by-userId`,
getCertificateFileName:`${baseUrl}user/get-certificate-file-name-by-userId`,
getLicenseByuserIdAndStatus:`${baseUrl}user/get-license-by-userId-status`,
getLicenseByuserId:`${baseUrl}user/get-license-by-userId`,


};
