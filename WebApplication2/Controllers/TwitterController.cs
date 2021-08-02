using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.Models;
using System.Threading.Tasks;

namespace WebApplication2.Controllers
{
    public class TwitterController : ApiController
    {
        // GET api/<controller>
        public async Task<object> Get([FromUri]string Input, [FromUri]int question)
        {
            TwitterModel tm = new TwitterModel();

            switch (question)
            {
                case 0:
                    return await tm.getBasicUserInfo(Input);
                case 1:
                    return await tm.getTimeLine(Input);
                case 2:
                    return await tm.getTimeLine(Input);
                case 6:
                    return await tm.getTimeLinecomm(Input);
                case 7:
                    return await tm.countWEEKhatags(Input);
                case 8:
                    return await tm.countWEEKtagsAT(Input);
                case 10:
                    return await tm.moreLikePosts(Input);
                case 11:
                    return await tm.GetpopG(Input);
                case 15:
                    return await tm.tweetsecrh(Input);
                case 16:
                    return await tm.countWEEKtagsAbT(Input);
                default:
                    return await tm.getTimeLine(Input);
            }
        }
        public async Task<object> Get([FromUri]string InputA, [FromUri]string InputB, [FromUri]int question)
        {
            TwitterModel tm = new TwitterModel();

            switch (question)
            {
                case 3:
                    return await tm.getBasicWEEKTimeLine2brands(InputA, InputB);
                case 4:
                    return await tm.returnBrandWithMoreF(InputA, InputB);
                case 5:
                    return await tm.GotMoreRetweets(InputA, InputB);
                case 9:
                    return await tm.GotMoreLikes(InputA, InputB);

                default:
                    return await tm.getTimeLine(InputA);
            }
        }



        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}