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
    
    public partial class usp_GetPropertyModelUnitListByFloor_Result
    {
        public long UID { get; set; }
        public Nullable<long> PID { get; set; }
        public string UnitNo { get; set; }
        public string Wing { get; set; }
        public string Building { get; set; }
        public string FloorNo { get; set; }
        public decimal Current_Rent { get; set; }
        public decimal Deposit { get; set; }
        public string Leased { get; set; }
        public int Rooms { get; set; }
        public Nullable<int> Bedroom { get; set; }
        public Nullable<int> Bathroom { get; set; }
        public Nullable<int> Hall { get; set; }
        public string Area { get; set; }
        public string FloorPlan { get; set; }
        public Nullable<System.DateTime> AvailableDate { get; set; }
        public string Premium { get; set; }
    }
}
