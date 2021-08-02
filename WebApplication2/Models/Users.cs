using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class Users
    {

        int id;
        string userName;
        string userPass;
        int points;
        string mail;



        public Users()
        {

        }

        public Users(int id, string userName, string userPass, int points, string mail)
        {
            Id = id;
            UserName = userName;
            UserPass = userPass;
            Points = points;
            Mail = mail;
        }

        public int Id { get => id; set => id = value; }
        public string UserName { get => userName; set => userName = value; }
        public string UserPass { get => userPass; set => userPass = value; }
        public int Points { get => points; set => points = value; }
        public string Mail { get => mail; set => mail = value; }

        public int insert()
        {
            DBservices dbs = new DBservices();
            dbs.insert(this);
            return 0;
        }
        public static List<Users> getwinners()
        {
            DBservices db = new DBservices();
            return db.getwinners();
        }
     
        
        public static Users login(string[] username)
        {
            DBservices dbs = new DBservices();
            return dbs.getuser(username);

        }
        public static void editUser(Users user)
        {
            DBservices dbs = new DBservices();
             dbs.editUser(user);

        }


    }
}