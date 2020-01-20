using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Customer
    {
        public long CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string EmailID { get; set; }
        public long PhoneNO { get; set; }
    }
}