using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
using System.Text;
using System.Globalization;
using WebApplication2.Models;


namespace WebApplication2.Models
{
    public class DBservices
    {
        public SqlDataAdapter da;
        public DataTable dt;

        public DBservices()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public int insert(Users user)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("DBConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            String cStr = BuildInsertCommand(user);      // helper method to build the insert string

            cmd = CreateCommand(cStr, con);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {

                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public Users getuser(string[] userName)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String cStr = "select * from Users_TW u where u.mail='" + userName[0] + "' and u.UserPass='" + userName[1] + "'";      // helper method to build the insert string

                SqlCommand cmd = new SqlCommand(cStr, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                Users user = new Users();
                while (dr.Read())
                {

                    user.Id = (int)dr["id"];
                    user.UserName = (string)dr["UserName"];
                    user.UserPass = (string)dr["UserPass"];
                    user.Points = (int)dr["points"];
                    user.Mail = (string)dr["mail"];

                }


                return user;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }


        }
        public float getpopular(string Brandname, int number)

        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("DBConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);

            }
            String cStr = "select round(CAST(sumCorrect AS float) / CAST(amountQ AS float), 2) as Popular from Brands_TW where BrandName='" + Brandname + "'";

            cmd = CreateCommand(cStr, con);             // create the command

            try
            {
                string str = cmd.ExecuteScalar().ToString();
                float f = (float)System.Convert.ToSingle(str);
                //  float numEffected = (float)cmd.ExecuteScalar(); // execute the command

                return f;
            }
            catch (Exception ex)
            {
                // write to log
                Console.WriteLine(ex);
                return(float)0.5;
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        public List<Users> getwinners()
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select top " + 5 + " * from Users_TW ORDER BY points DESC";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<Users> list = new List<Users>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    Users u = new Users();
                    u.Id = (int)dr["id"];
                    u.UserName = (string)dr["UserName"];
                    u.UserPass = (string)dr["UserPass"];
                    u.Points = (int)dr["points"];
                    u.Mail= (string)dr["mail"]; 
                    list.Add(u);

                }

                return list;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }


        }
        public string editUser(Users user)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("DBConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);

            }
           

           String cStr = "UPDATE Users_TW set points = '" + user.Points + "' where id = " + user.Id;      // helper method to build the insert string

            cmd = CreateCommand(cStr, con);             // create the command

            try
            {
                string numEffected = (string)cmd.ExecuteScalar(); // execute the command

                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        public List<brands> getbrands(string Catname)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from Brands_TW where CatName='" + Catname + "'";
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<brands> list = new List<brands>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    brands b = new brands();
                    b.Id = (int)dr["id"];
                    b.Brandname = (string)dr["BrandName"];
                    b.Catname = (string)dr["CatName"];
                    list.Add(b);

                }

                return list;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }


        }
        //זאת המטודה היא אמרוה לקבל מותג ולהחזיר רשימה של 5 מותגים חוץ מהמותג שקיבלה באותה קטגוריה ----------------------------------------
        public List<string> getBrandsOnSameCat(string brand)
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
                                                     // select BrandName from Brands_TW where CatName = (select CatName from Brands_TW where BrandName = " Zara") AND BrandName<>"Zara";

                String selectSTR ="select BrandName from Brands_TW where CatName = (select CatName from Brands_TW where BrandName = '"+brand+"') AND BrandName<>'"+brand+"'";

                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<string> list = new List<string>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                   // brands b = new brands();
                    //b.Id = (int)dr["id"];
                    //b.Brandname = (string)dr["BrandName"];
                  //  b.Catname = (string)dr["CatName"];
                    list.Add((string)dr["BrandName"]);

                }

                return list;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }


        }
    
        public List<category> getcategorys()
        {
            SqlConnection con = null;

            try
            {

                con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "select * from category_TW";
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                List<category> list = new List<category>();
                while (dr.Read())
                {   // Read till the end of the data into a row
                    category c = new category();
                    c.CatName = (string)dr["CatName"];
                    list.Add(c);

                }

                return list;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }

            }


        }


        public string addToBrandCorrectCount(string brand)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("DBConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);

            }

                string cStr = "UPDATE Brands_TW set sumCorrect += '" + 1 +"', amountQ += '" + 1 + "' where BrandName='" + brand+"'";
                cmd = CreateCommand(cStr, con);             // create the command

            

            try
            {
                string numEffected = (string)cmd.ExecuteScalar(); // execute the command

                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public string addToBrandCount(string brand)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("DBConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);

            }

                string cStr = "UPDATE Brands_TW set amountQ += '" + 1 + "'where BrandName='" + brand + "'";
            cmd = CreateCommand(cStr, con);             // create the command


           
            try
            {
                string numEffected = (string)cmd.ExecuteScalar(); // execute the command
                return numEffected;

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public SqlConnection connect(String conString)
        {

            // read the connection string from the configuration file
            string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }
        private String BuildInsertCommand(Users user)
        {
            String command;

            StringBuilder sb = new StringBuilder();
            //use a string builder to create the dynamic string
            sb.AppendFormat("Values( '{0}', '{1}','{2}','{3}')", user.UserName, user.UserPass, user.Points,user.Mail);
            String prefix = "INSERT INTO Users_TW " + "(UserName, UserPass,points,mail) ";
            command = prefix + sb.ToString();
            return command;
        }

        private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 40;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

            return cmd;
        }

    }
}
