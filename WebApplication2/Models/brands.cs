using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class brands
    {
        int id;
        string brandname;
        string catname;
        int sumCorrect;
        int amountQ;

        public int Id { get => id; set => id = value; }
        public string Brandname { get => brandname; set => brandname = value; }
        public string Catname { get => catname; set => catname = value; }
        public int SumCorrect { get => sumCorrect; set => sumCorrect = value; }
        public int AmountQ { get => amountQ; set => amountQ = value; }

        public brands()
        {
        }

        public brands(int id, string brandname, string catname, int sumCorrect, int amountQ)
        {
            Id = id;
            Brandname = brandname;
            Catname = catname;
            SumCorrect = sumCorrect;
            AmountQ = amountQ;
        }

        public static List<brands> getbrands(string Catname)
        {
            DBservices db = new DBservices();
            return db.getbrands(Catname);
        }
        public static string addToBrandCorrectCount(string value)
        {
            DBservices db = new DBservices();
           return db.addToBrandCorrectCount(value);
        }
        public static string addToBrandCount(string value)
        {
            DBservices db = new DBservices();
            return db.addToBrandCount(value);
        }
        public static List<string> getBrandsOnSameCat(string brand)
        {
            DBservices db = new DBservices();
            return db.getBrandsOnSameCat(brand);
        }
        public static float getpopular(string Brandname, int number)
        {
            DBservices db = new DBservices();
            return db.getpopular(Brandname, number);
        }

    }
}