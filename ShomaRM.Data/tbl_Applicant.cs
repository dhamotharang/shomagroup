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
    
    public partial class tbl_Applicant
    {
        public long ApplicantID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<System.DateTime> DateOfBirth { get; set; }
        public Nullable<int> Gender { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Nullable<long> TenantID { get; set; }
        public string Type { get; set; }
        public string Relationship { get; set; }
        public Nullable<decimal> MoveInPercentage { get; set; }
        public Nullable<decimal> MoveInCharge { get; set; }
        public Nullable<decimal> MonthlyPercentage { get; set; }
        public Nullable<decimal> MonthlyPayment { get; set; }
        public string OtherGender { get; set; }
        public Nullable<int> Paid { get; set; }
        public Nullable<long> AddedBy { get; set; }
        public Nullable<int> UserID { get; set; }
        public Nullable<int> CreditPaid { get; set; }
        public Nullable<int> BackGroundPaid { get; set; }
        public Nullable<decimal> AdminFee { get; set; }
        public Nullable<decimal> AdminFeePercentage { get; set; }

        public string CustID { get; set; }

        public string CreditResult { get; set; }
        public string BackGroungResult { get; set; }
    
        public virtual tbl_ApplyNow tbl_ApplyNow { get; set; }
    }
}
