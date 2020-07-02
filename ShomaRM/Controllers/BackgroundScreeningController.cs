﻿using Newtonsoft.Json;
using ShomaRM.Data;
using ShomaRM.Models;
using ShomaRM.Models.Acutraq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Web.Mvc;
using System.Xml.Linq;

namespace ShomaRM.Controllers
{
    public class BackgroundScreeningController : Controller
    {


        [HttpPost, ValidateInput(false)]
        public ActionResult ReceiveRequest()
        {
            try
            {
                //////Get Background screening result
                ////var result = Request.Form["request"];

                ////var xDoc = XDocument.Parse(result.ToString());

                //////ReportLink extraction from CData
                ////var reportlink = xDoc.DescendantNodes().OfType<XCData>().Where(m => m.Parent.Name == "ReportLink").FirstOrDefault();
                ////string ReportURl = reportlink.Value;

                ////// for attribute
                ////var resultOrderDetail = xDoc
                //// .Descendants("OrderXML")
                //// .Descendants("Order")
                //// .Descendants("OrderDetail")
                //// .ToList();
                ////ShomaRMEntities db = new ShomaRMEntities();
                //////updating PDFURL and Status of tenant 
                ////foreach (var xmldata in resultOrderDetail)
                ////{
                ////    var orderId = Convert.ToInt32(xmldata.LastAttribute.Value);
                ////    //Get Tenent Order ID to update data
                ////    var bgscrData = db.tbl_BackgroundScreening.Where(a => a.OrderID == orderId).FirstOrDefault();
                ////    if (bgscrData != null)
                ////    {
                ////        bgscrData.Status = xmldata.Element("Status").Value;
                ////        bgscrData.PDFUrl = (ReportURl != null) ? ReportURl : "";
                ////        db.SaveChanges();
                ////    }
                ////}
            }
            catch (Exception ex)
            {
            }
            return null;
        }
    }
}