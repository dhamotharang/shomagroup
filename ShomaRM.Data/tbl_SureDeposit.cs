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
    
    public partial class tbl_SureDeposit
    {
        public long SDID { get; set; }
        public string SDNumber { get; set; }
        public string SDUploadName { get; set; }
        public Nullable<long> ProspectID { get; set; }
        public Nullable<long> ParentTOID { get; set; }
        public Nullable<System.DateTime> UploadDate { get; set; }
        public Nullable<System.DateTime> ExpirationDate { get; set; }
        public Nullable<int> Status { get; set; }
    }
}
