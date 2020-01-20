using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class CustomerController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = "select CustomerID,CustomerName,CustomerAddress,EmailID,PhoneNO from dbo.Customers";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["MedicalAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Customer Cust)
        {
            DataTable table = new DataTable();

            string query = "insert into dbo.Customers Values('" + Cust.CustomerName + "', '"+ Cust.CustomerAddress + "', '"+ Cust.EmailID +"', '"+ Cust.PhoneNO +"')";

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

        public string Put(Customer Cust)
        {
            DataTable table = new DataTable();

            string query = "update dbo.Customers set CustomerName = '" +Cust.CustomerName+"', CustomerAddress = '" +Cust.CustomerAddress+"', EmailID = '" +Cust.EmailID+"', PhoneNO = '"+Cust.PhoneNO+"' where CustomerID = "+Cust.CustomerID+" ";

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

            string query = "delete from dbo.Customers where CustomerID =" + id;
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
