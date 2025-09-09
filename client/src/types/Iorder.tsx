
 interface IOrder{
    id: string,
    employee: IUsers,
    customer:IUsers,
    totalAmount:number ,
    orderItems : Array<IOrderItems>
    orderStatusId:string,
    companyId:ICompany,
    creditCardNumber:number,
    expiryOn:Date,
    currency:string,
    cvc:string,
    notificationFlag:boolean,
    auditData:IAuditData
  }

  

   interface IProductCategory {
    
    id: string ,
    name:string,
    desc:string,
    companiId :ICompany,
      auditData:IAuditData
}
   export interface IUsers {
    id: string,
    fullName: string,
    password: string,
    address:IAddress,
    roleId:IRoles,
    companyId:ICompany,
    AuditData:IAuditData
  }

  export interface IAddress {
    telephone: string,
    address: string,
    email:string
    
  }
 export  interface IRoles {
    id: string,
    name: EName,
    desc: string,
    AuditData:IAuditData
  }
  enum EName {
    Value1 = 'Admin',
    Value2 = 'employee',
    Value3 = 'customer'
  }
 export  interface IAuditData {
    createDate: Date,
    updateDte: Date
  }
  
export interface ICompany {
    id: string,
    name: string,
    auditData:IAuditData
    
  }
 export interface IOrderItems {
    productId: IProduct,
    amount: number,
    quantity:number
  } 
   export interface IProduct {
    id:string,
    name: string,
    desc: string,
    price:number,
    discount:EDiscount,
    productCategoryId:IProductCatagory,
    inventory:number,
    companyId:ICompany,
    auditData:IAuditData

  } 
  enum EDiscount {
    Value1 = 'Percentage',
    Value2 = 'FixedAmount'
  } 
  interface IProductCatagory {
    id: string,
    name: string,
    desc:string,
    companyId:ICompany,
    auditData:IAuditData
  } 

  interface IpandingOrder{
    id: string,
    price: number,
    orderStatusId:string,
    customer:string,
    product:string

  } 

  // @Id
  // private String id;
  // private Users employee;
  // private Users customer;
  // private double totalAmount;
  // private List<Order_Items> orderItems;
  // private status orderStatusId;
  // private Company companyId;
  // private long creditCardNumber;
  // private LocalDate expiryOn;
  // private String cvc;
  // private Boolean notificationFlag;
  // private AuditData auditData;

  export type { IpandingOrder

  };
  export type { IOrder

};
export type { IProductCategory

};