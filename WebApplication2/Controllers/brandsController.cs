using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class brandsController : ApiController
    {

        // GET api/<controller>
        public List<brands> Get(string Catname)
        {
            return brands.getbrands(Catname);
        }
        public float Get([FromUri]string Brandname, int number)
        {
            return brands.getpopular(Brandname, number);
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromUri]string value)
        {
            brands.addToBrandCorrectCount(value);
        }

        // PUT api/<controller>/5

        public void Put([FromUri]string value)
        {
            brands.addToBrandCount(value);
        }

        // DELETE api/<controller>/5
        public List<string> Delete(string brand)
        {

                return brands.getBrandsOnSameCat(brand);
            


        }
    }
}