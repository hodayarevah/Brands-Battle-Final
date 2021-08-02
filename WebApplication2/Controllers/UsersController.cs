using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class UsersController : ApiController
    {
        // GET: api/User
        public List<Users> Get()
        {

            return Users.getwinners();
        }

        // GET: api/User/5
      
        // POST: api/User
        public int Post([FromBody]Users user)
        {
           return user.insert();
        }

        // PUT: api/User/5
        //בדיקת תקינות סיסמא
        public Users Put(string[] username)
        {
            return Users.login(username);
        }

        public void Delete([FromBody]Users user)
        {
            Users.editUser(user);
        }
        // DELETE: api/User/5
 
        
    }
}