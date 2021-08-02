using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class category
    {
        string catName;

        public category()
        {
        }

        public category(string catName)
        {
            CatName = catName;
        }

        public string CatName { get => catName; set => catName = value; }
        public static List<category> getcategorys()
        {
            DBservices db = new DBservices();
            return db.getcategorys();
        }
    }
}