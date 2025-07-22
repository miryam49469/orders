import { IAuditData, ICompany } from "./Iorder";

export interface IProductCatagory {
    id: string,
    name: string,
    desc:string,
    companyId:ICompany,
    auditData:IAuditData
  } 