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
    
    public partial class usp_GetTenantTransactionList_Result
    {
        public int TransID { get; set; }
        public System.DateTime Transaction_Date { get; set; }
        public string Description { get; set; }
        public decimal Credit_Amount { get; set; }
        public decimal Charge_Amount { get; set; }
        public string AccountName { get; set; }
        public Nullable<decimal> Balance { get; set; }
    }
}
