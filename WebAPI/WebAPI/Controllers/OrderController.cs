using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WebAPI.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebAPI.Controllers
{
    public class OrderController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = "select OrderID,OrderName,Description,convert(varchar(10),OrderDate,120) as OrderDate from dbo.Orders";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MedicalAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Order Ord)
        {
            DataTable table = new DataTable();
            string OrderDate = Ord.OrderDate.ToString().Split(' ')[0];

            string query = "insert into dbo.Orders Values('"+ Ord.OrderName +"', '"+ Ord.Description +"', '"+ OrderDate +"')";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MedicalAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            try
            {
                return "Added Successfully";
            }
            catch(Exception)
            {
                return "Failed to Add";
            }
        }

        public string Put(Order Ord)
        {
            DataTable table = new DataTable();
            string OrderDate = Ord.OrderDate.ToString().Split(' ')[0];

            string query = "update dbo.Orders set OrderName = '"+Ord.OrderName+"', Description = '"+Ord.Description+"', OrderDate = '"+OrderDate+"' where OrderID = "+Ord.OrderID+" ";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MedicalAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            try
            {
                return "Updated Successfully";
            }
            catch (Exception)
            {
                return "Failed to Update";
            }
        }

        public string Delete(int id)
        {
            DataTable table = new DataTable();

            string query = "delete from dbo.Orders where OrderID = " +id ;

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MedicalAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            try
            {
                return "Deleted Successfully";
            }
            catch (Exception)
            {
                return "Failed to Delete";
            }
        }
    }
}
