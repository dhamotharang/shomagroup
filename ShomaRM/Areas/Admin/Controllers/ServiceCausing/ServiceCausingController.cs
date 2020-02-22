﻿using ShomaRM.Areas.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShomaRM.Areas.Admin.Controllers
{
    public class ServiceCausingController : Controller
    {
        // GET: Admin/ServiceCausing
        public ActionResult Index()
        {
            ViewBag.ActiveMenu = "admin";
            UsersModel model = new UsersModel();
            if (model.HasRight == 1)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        public ActionResult fillCausingSearchGrid(SCIListModel model)
        {
            try
            {
                return Json((new ServiceCausingIssueModel()).FillSCISSearchGrid(model), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult BuildPaganationSLList(SCIListModel model)
        {
            try
            {
                return Json(new { NOP = (new ServiceCausingIssueModel()).BuildPaganationSLList(model) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult getCausingData(int CausingIssueID = 0)
        {
            try
            {
                return Json((new ServiceCausingIssueModel()).GetServiceCausingInfo(CausingIssueID), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult saveUpdateCausing(ServiceCausingIssueModel model)
        {
            try
            {
                return Json(new { result = 1, ID = model.SaveUpdateServiceCausingIssue(model) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult DeleteServiceCausing(long CausingIssueID)
        {
            try
            {
                return Json(new { model = new ServiceCausingIssueModel().DeleteServiceCausing(CausingIssueID) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }


        }

    }
}