//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ShomaRM.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_Tenant
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_Tenant()
        {
            this.tbl_CashReceipts = new HashSet<tbl_CashReceipts>();
            this.tbl_EventBooking = new HashSet<tbl_EventBooking>();
            this.tbl_FacilityBooking = new HashSet<tbl_FacilityBooking>();
            this.tbl_Notice = new HashSet<tbl_Notice>();
            this.tbl_UtilityBilling = new HashSet<tbl_UtilityBilling>();
            this.tbl_WorkOrder = new HashSet<tbl_WorkOrder>();
        }
    
        public long ID { get; set; }
        public string FirstName { get; set; }
        public string MiddleInitial { get; set; }
        public string LastName { get; set; }
        public Nullable<System.DateTime> DateOfBirth { get; set; }
        public Nullable<int> Gender { get; set; }
        public Nullable<int> MaritalStatus { get; set; }
        public Nullable<int> StudentStatus { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public Nullable<long> State { get; set; }
        public string Zip { get; set; }
        public string HomePhone { get; set; }
        public string SocialSecurityNum { get; set; }
        public string DriverLicense { get; set; }
        public string CarMake { get; set; }
        public string CarModel { get; set; }
        public string CarLic { get; set; }
        public string EmergencyContact { get; set; }
        public string EmergencyPhone { get; set; }
        public Nullable<int> RentResp { get; set; }
        public Nullable<decimal> Income { get; set; }
        public Nullable<long> PropertyID { get; set; }
        public Nullable<long> UnitID { get; set; }
        public string Occupation { get; set; }
        public string OfficeName { get; set; }
        public string JobCode { get; set; }
        public string OfficeEmail { get; set; }
        public string OfficePhone { get; set; }
        public string OfficePhoneExtension { get; set; }
        public string OfficeAddress { get; set; }
        public string OfficeCity { get; set; }
        public Nullable<int> OfficeState { get; set; }
        public string OfficeZip { get; set; }
        public string EmployerContact { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> LastModifiedBy { get; set; }
        public Nullable<System.DateTime> LastModifiedeDate { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_CashReceipts> tbl_CashReceipts { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_EventBooking> tbl_EventBooking { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_FacilityBooking> tbl_FacilityBooking { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_Notice> tbl_Notice { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_UtilityBilling> tbl_UtilityBilling { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_WorkOrder> tbl_WorkOrder { get; set; }
        public virtual tbl_Login tbl_Login { get; set; }
        public virtual tbl_Login tbl_Login1 { get; set; }
        public virtual tbl_Login tbl_Login2 { get; set; }
        public virtual tbl_Login tbl_Login3 { get; set; }
        public virtual tbl_Properties tbl_Properties { get; set; }
        public virtual tbl_Properties tbl_Properties1 { get; set; }
    }
}
