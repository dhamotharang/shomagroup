﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ShomaRMEntities : DbContext
    {
        public ShomaRMEntities()
            : base("name=ShomaRMEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tbl_AcutraqScrenning> tbl_AcutraqScrenning { get; set; }
        public virtual DbSet<tbl_Advertiser> tbl_Advertiser { get; set; }
        public virtual DbSet<tbl_Amenities> tbl_Amenities { get; set; }
        public virtual DbSet<tbl_AmenityPriceRange> tbl_AmenityPriceRange { get; set; }
        public virtual DbSet<tbl_AmenityReservation> tbl_AmenityReservation { get; set; }
        public virtual DbSet<tbl_Applicant> tbl_Applicant { get; set; }
        public virtual DbSet<tbl_ApplicantHistory> tbl_ApplicantHistory { get; set; }
        public virtual DbSet<tbl_ApplyNow> tbl_ApplyNow { get; set; }
        public virtual DbSet<tbl_AuditHistory> tbl_AuditHistory { get; set; }
        public virtual DbSet<tbl_AuditHistoryDetail> tbl_AuditHistoryDetail { get; set; }
        public virtual DbSet<tbl_BankAccount> tbl_BankAccount { get; set; }
        public virtual DbSet<tbl_Bill> tbl_Bill { get; set; }
        public virtual DbSet<tbl_CashReceipts> tbl_CashReceipts { get; set; }
        public virtual DbSet<tbl_CausingIssue> tbl_CausingIssue { get; set; }
        public virtual DbSet<tbl_ChargeType> tbl_ChargeType { get; set; }
        public virtual DbSet<tbl_City> tbl_City { get; set; }
        public virtual DbSet<tbl_Club> tbl_Club { get; set; }
        public virtual DbSet<tbl_ClubMapping> tbl_ClubMapping { get; set; }
        public virtual DbSet<tbl_CommunityActivity> tbl_CommunityActivity { get; set; }
        public virtual DbSet<tbl_Country> tbl_Country { get; set; }
        public virtual DbSet<tbl_Document> tbl_Document { get; set; }
        public virtual DbSet<tbl_DocumentVerification> tbl_DocumentVerification { get; set; }
        public virtual DbSet<tbl_EmployerHistory> tbl_EmployerHistory { get; set; }
        public virtual DbSet<tbl_Estimate> tbl_Estimate { get; set; }
        public virtual DbSet<tbl_Event> tbl_Event { get; set; }
        public virtual DbSet<tbl_EventBooking> tbl_EventBooking { get; set; }
        public virtual DbSet<tbl_Facility> tbl_Facility { get; set; }
        public virtual DbSet<tbl_FacilityBooking> tbl_FacilityBooking { get; set; }
        public virtual DbSet<tbl_FOB> tbl_FOB { get; set; }
        public virtual DbSet<tbl_Gallery> tbl_Gallery { get; set; }
        public virtual DbSet<tbl_GuestRegistration> tbl_GuestRegistration { get; set; }
        public virtual DbSet<tbl_Invoice> tbl_Invoice { get; set; }
        public virtual DbSet<tbl_Issue> tbl_Issue { get; set; }
        public virtual DbSet<tbl_Lease> tbl_Lease { get; set; }
        public virtual DbSet<tbl_LeaseRenewal> tbl_LeaseRenewal { get; set; }
        public virtual DbSet<tbl_LeaseTerms> tbl_LeaseTerms { get; set; }
        public virtual DbSet<tbl_LeaseTransfer> tbl_LeaseTransfer { get; set; }
        public virtual DbSet<tbl_Login> tbl_Login { get; set; }
        public virtual DbSet<tbl_LoginHistory> tbl_LoginHistory { get; set; }
        public virtual DbSet<tbl_Models> tbl_Models { get; set; }
        public virtual DbSet<tbl_MonthlyPayment> tbl_MonthlyPayment { get; set; }
        public virtual DbSet<tbl_MoveInPayment> tbl_MoveInPayment { get; set; }
        public virtual DbSet<tbl_Notes> tbl_Notes { get; set; }
        public virtual DbSet<tbl_Notice> tbl_Notice { get; set; }
        public virtual DbSet<tbl_OnlinePayment> tbl_OnlinePayment { get; set; }
        public virtual DbSet<tbl_Parking> tbl_Parking { get; set; }
        public virtual DbSet<tbl_PaymentAccounts> tbl_PaymentAccounts { get; set; }
        public virtual DbSet<tbl_PetPlace> tbl_PetPlace { get; set; }
        public virtual DbSet<tbl_PremiumType> tbl_PremiumType { get; set; }
        public virtual DbSet<tbl_Promotion> tbl_Promotion { get; set; }
        public virtual DbSet<tbl_Properties> tbl_Properties { get; set; }
        public virtual DbSet<tbl_PropertyFloor> tbl_PropertyFloor { get; set; }
        public virtual DbSet<tbl_PropertyUnits> tbl_PropertyUnits { get; set; }
        public virtual DbSet<tbl_PurchaseOrder> tbl_PurchaseOrder { get; set; }
        public virtual DbSet<tbl_Rating> tbl_Rating { get; set; }
        public virtual DbSet<tbl_RequestOffer> tbl_RequestOffer { get; set; }
        public virtual DbSet<tbl_SalesAgent> tbl_SalesAgent { get; set; }
        public virtual DbSet<tbl_ServiceIssue> tbl_ServiceIssue { get; set; }
        public virtual DbSet<tbl_ServiceLocation> tbl_ServiceLocation { get; set; }
        public virtual DbSet<tbl_ServiceRequest> tbl_ServiceRequest { get; set; }
        public virtual DbSet<tbl_State> tbl_State { get; set; }
        public virtual DbSet<tbl_Storage> tbl_Storage { get; set; }
        public virtual DbSet<tbl_Tenant> tbl_Tenant { get; set; }
        public virtual DbSet<tbl_TenantEventJoin> tbl_TenantEventJoin { get; set; }
        public virtual DbSet<tbl_TenantEventJoinApprove> tbl_TenantEventJoinApprove { get; set; }
        public virtual DbSet<tbl_TenantInfo> tbl_TenantInfo { get; set; }
        public virtual DbSet<tbl_TenantMonthlyPayments> tbl_TenantMonthlyPayments { get; set; }
        public virtual DbSet<tbl_TenantOnline> tbl_TenantOnline { get; set; }
        public virtual DbSet<tbl_TenantParking> tbl_TenantParking { get; set; }
        public virtual DbSet<tbl_TenantPet> tbl_TenantPet { get; set; }
        public virtual DbSet<tbl_TenantPetPlace> tbl_TenantPetPlace { get; set; }
        public virtual DbSet<tbl_TenantStorage> tbl_TenantStorage { get; set; }
        public virtual DbSet<tbl_Transaction> tbl_Transaction { get; set; }
        public virtual DbSet<tbl_UnitLeasePrice> tbl_UnitLeasePrice { get; set; }
        public virtual DbSet<tbl_Utility> tbl_Utility { get; set; }
        public virtual DbSet<tbl_UtilityBilling> tbl_UtilityBilling { get; set; }
        public virtual DbSet<tbl_Vehicle> tbl_Vehicle { get; set; }
        public virtual DbSet<tbl_Vendor> tbl_Vendor { get; set; }
        public virtual DbSet<tbl_Visit> tbl_Visit { get; set; }
        public virtual DbSet<tbl_WorkOrder> tbl_WorkOrder { get; set; }
        public virtual DbSet<tbl_ZipCodes> tbl_ZipCodes { get; set; }
        public virtual DbSet<tbl_SMSMessages> tbl_SMSMessages { get; set; }
        public virtual DbSet<tbl_TenantFob> tbl_TenantFob { get; set; }
        public virtual DbSet<tbl_Prospect> tbl_Prospect { get; set; }
        public virtual DbSet<tbl_MoveInChecklist> tbl_MoveInChecklist { get; set; }
        public virtual DbSet<tbl_ESignatureKeys> tbl_ESignatureKeys { get; set; }
    }
}
