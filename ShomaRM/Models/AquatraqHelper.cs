﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
namespace ShomaRM.Models
{
    public static class AquatraqHelper
    {
        public static string Serialize<T>(this T value)
        {
            if (value == null)
            {
                return string.Empty;
            }
            try
            {
                var xmlserializer = new XmlSerializer(typeof(T));
             
                var stringWriter = new StringWriter();
                using (var writer = XmlWriter.Create(stringWriter))
                {
                    xmlserializer.Serialize(writer, value);
                    return stringWriter.ToString();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred", ex);
            }
        }
        public static string SetAttributeValue( string defaultXML,string ordernumber)
        {

            try
            {
                defaultXML = defaultXML.Replace("<CompanyName", "<CompanyName CurrentEmployer = \"Yes\"");

                defaultXML = defaultXML.Replace("<PackageServiceCode", "<PackageServiceCode OrderId=\"" + ordernumber+"\"");
                defaultXML = defaultXML.Replace("<Salary", "<Salary period=\"Yearly\"");
              


                return defaultXML;



            }
            catch (Exception e)
            {
                return defaultXML;
                Console.WriteLine(e);
            }

         

        }
        public static async Task<TResult> PostFormUrlEncoded<TResult>(string url, List<KeyValuePair<string, string>> postData)
        {
            using (var httpClient = new HttpClient())
            {
                using (var content = new FormUrlEncodedContent(postData))
                {
                    content.Headers.Clear();
                    content.Headers.Add("Content-Type", "application/x-www-form-urlencoded");

                    HttpResponseMessage response = await httpClient.PostAsync(url, content);

                    return await response.Content.ReadAsAsync<TResult>();
                }
            }
        }
    }
}