using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Order
    {
        public long OrderID { get; set; }
        public string OrderName { get; set; }
        public string Description { get; set; }
        public DateTime? OrderDate { get; set; }
    }
}