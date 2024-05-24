using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SocialMediaApp.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult HomePage()
        {
            var responseData = ViewBag.ResponseData;

            return View();
        }
        public ActionResult AboutPage()
        {
            var responseData = ViewBag.ResponseData;
            return View();
        }
        public ActionResult MessagePage()
        {

            return View();
        }
        public ActionResult Notification()
        {
            var responseData = ViewBag.ResponseData;


            return View();
        }
        public ActionResult UserProfile()
        {
            var responseData = ViewBag.ResponseData;


            return View();
        }
    }

}