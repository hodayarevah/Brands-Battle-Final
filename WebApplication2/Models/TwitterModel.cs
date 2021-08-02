using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Tweetinvi;
using Tweetinvi.Parameters;
using Tweetinvi.Models;
using Tweetinvi.Parameters.Enum;
using Tweetinvi.Parameters.V2;
using Tweetinvi.Streaming.V2;
using Microsoft.Ajax.Utilities;

namespace WebApplication2.Models
{
    public class TwitterModel
    {

        /*--------------------------Consumer Keys-----------------------------*/
        /*--------------------------------------------------------------------*/

        /*-------------------------API key & secret---------------------------*/
        string _API_key = "zcepOgSZmIhaQRy54L1KLMhXa";
        string _API_key_secret = "3IG4w5aNH4tgmgn9AEEztGo0D0XMdL4qC7fSj2aIvKwqBt6H7e";

        /*-------------------------Authentication Tokens----------------------*/
        /*--------------------------------------------------------------------*/


        /*-------------------------Bearer token-------------------------------*/
        //  string bearer_token = "AAAAAAAAAAAAAAAAAAAAANN5JgEAAAAA%2FbmU7by8ky8Jm4OsN7BsYWlRYLw%3DEJ21ZiWyErnkWPbG3W50oG6eis6mpFxwMe9YsN6GKsVqJFbKFW";


        /*--------------------Access token & secret--------------------------*/
        string access_token = "1324056647027884033-uVxW1p60vwskIt7LBf9tbDZIkF8EC8";
        string access_token_secret = "fPDWuQFGGQat4X3tdbSqgGR7y7EjqqNIfMkFxT4gKZzNt";


        /*---------basic user info---id , logoimg , followers-----------*/

        //מידע בסיסי על המותג
        public async Task<object> getBasicUserInfo(string input)
        {
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var userParameters = new GetUserByNameV2Parameters(input)
            {
                Expansions = { UserResponseFields.Expansions.PinnedTweetId },
                TweetFields = { UserResponseFields.Tweet.Attachments, UserResponseFields.Tweet.Entities },
                UserFields = UserResponseFields.User.ALL,

            };
            try
            {
                var userResponse = await tc.UsersV2.GetUserByNameAsync(userParameters);
                var user = userResponse;
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return 1;

            }
          

        }

        //כמו תיוגים בשבוע 
        public async Task<object> countWEEKhatags(string inputa)
        {
            //DateTime foo = DateTime.UtcNow.AddDays(-7);
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(inputa)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };
            try
            {
                var tweetsA = await tc.Timelines.GetUserTimelineAsync(parameters);

                var countA = 0;
                foreach (var tweet in tweetsA)
                {

                    //   DateTimeOffset.Parse(string).UtcDateTime
                    if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                    {
                        countA += tweet.Entities.Hashtags.Count;
                        countA += tweet.UserMentions.Count;
                    }
                    else break;

                }

                return countA;
            }


            catch (Exception ex)
            {

                Console.WriteLine(ex);
                return 1;

            }

        }

        //search @
        public async Task<object> countWEEKtagsAbT(string input)
        {
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var ourDate = DateTime.Today;
            var parameters = new SearchTweetsParameters('@' + input)

            {

                Filters = TweetSearchFilters.Replies,
                Until = DateTime.Today,//7 days
                Since = DateTime.Today.AddDays(-7),
                SearchType = SearchResultType.Mixed,
                IncludeEntities = true,
                Lang = LanguageFilter.English,
                TweetMode = TweetMode.None

            };
            try
            {
                var tweets = await tc.Search.SearchTweetsAsync(parameters);
                List<object> weekT = new List<object>();
                foreach (var item in tweets)
                {
                    weekT.Add(item.FullText);
                }
                return weekT;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return 1;

            }

        }

        //serch #
        public async Task<object> tweetsecrh(string input)
        {
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var ourDate = DateTime.Today;
            var parameters = new SearchTweetsParameters("#" + input)

            {

                Filters = TweetSearchFilters.Hashtags,
                Until = DateTime.Today,//7 days
                Since = DateTime.Today.AddDays(-7),
                SearchType = SearchResultType.Popular,
                IncludeEntities = true,
                Lang = LanguageFilter.English,
                TweetMode = TweetMode.None,



            };
            try
            {
                var tweets = await tc.Search.SearchTweetsAsync(parameters);
                return tweets;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return 1;

            }
        }


        public async Task<object> GetpopG(string inputa)
        {

            //DateTime foo = DateTime.UtcNow.AddDays(-7);
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(inputa)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא
                IncludeContributorDetails = true,
                IncludeEntities = true,
                IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 




            };
            try
            {
                var Retweets = 0;
                var Likes = 0;
                var Comment = 0;
                var tweetsA = await tc.Timelines.GetUserTimelineAsync(parameters);
                foreach (var tweet in tweetsA)
                {

                    //   DateTimeOffset.Parse(string).UtcDateTime
                    if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                    {
                        Retweets += tweet.RetweetCount;
                        Likes += tweet.FavoriteCount;

                    }

                    else if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 16)
                    {
                        Retweets += tweet.RetweetCount;
                        Likes += tweet.FavoriteCount;

                    }
                    else break;

                }
                if (Retweets * Likes == 0)
                {
                    if (Retweets == 0)
                        Retweets++;
                    else
                        Likes++;
                }


                var parametersComm = new GetUserTimelineParameters(inputa)
                {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא
                 //SinceId = DateTime.Now.AddDays(-7).Ticks,


                    IncludeContributorDetails = true,
                    IncludeEntities = true,
                    ///  IncludeRetweets = true,
                    ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 
                                          // = DateTime.Today.Ticks,//7 days

                };
                var tweets = await tc.Timelines.GetUserTimelineAsync(parametersComm);
                var tweetId = tweets[0].Id;
                var tweetResponse = await tc.TweetsV2.GetTweetAsync(tweetId);
                var tweetC = tweetResponse.Tweet;
                Comment = tweetC.PublicMetrics.ReplyCount;
                if (Comment == 0)
                    Comment++;


                ///     List<int> all = new List<int>();
                // List[] all = new List[4] { Comment, Retweets , Likes, (tweetsA[0].CreatedBy.FollowersCount)  };
                /// all.Add(Comment);
                var FollowCount = Math.Log10((tweetsA[0].CreatedBy.FollowersCount));
                var commentB = ((((double)Comment) / ((double)FollowCount))) * 0.2;
                if (commentB > 20)
                    commentB = 20;
                var RetweetB = ((((double)Retweets) / ((double)FollowCount))) * 0.5;
                if (RetweetB > 50)
                    RetweetB = 50;
                var LikeB = ((((double)Likes) / ((double)FollowCount))) * 0.3;
                if (LikeB > 30)
                    LikeB = 30;
                ///var  mehane =  (tweetsA[0].CreatedBy.FollowersCount);
                // float hiluk = (((float)mone) / ((float)mehane));
                double all = commentB + RetweetB + LikeB;
                all = (double)System.Math.Round(all, 2);
                return (all.ToString());
            }
            catch 
            {
                return "52.6";
            }
          
        }


        //
        public async Task<object> countWEEKtagsAT(string inputa)
        {
            //DateTime foo = DateTime.UtcNow.AddDays(-7);
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(inputa)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };
            try
            {
                var tweetsA = await tc.Timelines.GetUserTimelineAsync(parameters);

                var countA = 0;
                foreach (var tweet in tweetsA)
                {

                    //   DateTimeOffset.Parse(string).UtcDateTime
                    if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                    {
                        countA += tweet.UserMentions.Count;
                    }
                    else break;

                }

                return countA;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return 1;

            }
        }

        public async Task<object> moreLikePosts(string input)
        {

            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(input)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא
             //SinceId = DateTime.Now.AddDays(-7).Ticks,


                IncludeContributorDetails = true,
                IncludeEntities = true,
                ///  IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 
                                      // = DateTime.Today.Ticks,//7 days

            };
            try
            {
                var tweets = await tc.Timelines.GetUserTimelineAsync(parameters);

                Object[,] allFourTWittes = new Object[4, 2] { { tweets[0].Text, tweets[0].FavoriteCount }, { tweets[1].Text, tweets[1].FavoriteCount }, { tweets[2].Text, tweets[2].FavoriteCount }, { tweets[3].Text, tweets[3].FavoriteCount } };

                return allFourTWittes;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return 1;

            }

        }




        /*
               //serch #
           public async Task<object> test()
           {
               var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
              var ourDate = DateTime.Today;
              var parameters = new SearchTweetsParameters("#Nike")

        {

                   Filters = TweetSearchFilters.Hashtags,
                   Until = DateTime.Today,//7 days
                  Since = DateTime.Today.AddDays(-7),
                 SearchType = SearchResultType.Mixed,
                   IncludeEntities = true,
                   Lang = LanguageFilter.English,
                  TweetMode = TweetMode.None

               };
                 var tweets = await tc.Search.SearchTweetsAsync(parameters);
                  return tweets;
           }

            //search @
            public async Task<object> test()
              {
                  var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
                  var ourDate = DateTime.Today;
                  var parameters = new SearchTweetsParameters("1371008303057174531")

                  {

                      Filters = TweetSearchFilters.Replies,
                      Until = DateTime.Today,//7 days
                      Since = DateTime.Today.AddDays(-7),
                      SearchType = SearchResultType.Mixed,
                      IncludeEntities = true,
                      Lang = LanguageFilter.English,
                      TweetMode = TweetMode.None

                  };
                  var tweets = await tc.Search.SearchTweetsAsync(parameters);
                  return tweets;
              }
              */

        //מחזיר מותג עם יותר עוקבים
        public async Task<object> returnBrandWithMoreF(string inputa, string inputb)
        {
            var tweetsA=0;
            var tweetsB=0;
            
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var userParametersA = new GetUserByNameV2Parameters(inputa)
            {
                Expansions = { UserResponseFields.Expansions.PinnedTweetId },
                TweetFields = { UserResponseFields.Tweet.Attachments, UserResponseFields.Tweet.Entities },
                UserFields = UserResponseFields.User.ALL,

            };
            try { 
            var tweetsallA = await tc.UsersV2.GetUserByNameAsync(userParametersA);
                if (tweetsallA.User != null)
                {
                    tweetsA = tweetsallA.User.PublicMetrics.FollowersCount;
                }
                    var userParametersB = new GetUserByNameV2Parameters(inputb)
                    {
                        Expansions = { UserResponseFields.Expansions.PinnedTweetId },
                        TweetFields = { UserResponseFields.Tweet.Attachments, UserResponseFields.Tweet.Entities },
                        UserFields = UserResponseFields.User.ALL,

              
                    };
                   
                
               var tweetsallB = await tc.UsersV2.GetUserByNameAsync(userParametersB);
                if (tweetsallB.User != null)
                {
                     tweetsB = tweetsallB.User.PublicMetrics.FollowersCount;
                }
             
                if (tweetsA > tweetsB)
                    return inputa;
                else return inputb;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return inputb;

            }
        }


        public async Task<object> getTimeLine(string input)
        {

            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(input)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא
             //SinceId = DateTime.Now.AddDays(-7).Ticks,


                IncludeContributorDetails = true,
                IncludeEntities = true,
                ///  IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 
                                      // = DateTime.Today.Ticks,//7 days

            };
            var tweets = await tc.Timelines.GetUserTimelineAsync(parameters);
            return tweets;

        }

        public async Task<object> getTimeLinerutrntw(string input)
        {

            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(input)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא
             //SinceId = DateTime.Now.AddDays(-7).Ticks,


                IncludeContributorDetails = true,
                IncludeEntities = true,
                ///  IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 
                                      // = DateTime.Today.Ticks,//7 days

            };
            var tweets = await tc.Timelines.GetUserTimelineAsync(parameters);

            return tweets;

        }


        public async Task<object> getTimeLinecomm(string input)
        {

            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(input)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא
             //SinceId = DateTime.Now.AddDays(-7).Ticks,


                IncludeContributorDetails = true,
                IncludeEntities = true,
                ///  IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 
                                      // = DateTime.Today.Ticks,//7 days

            };
            try
            {
                var tweets = await tc.Timelines.GetUserTimelineAsync(parameters);
                var tweetId = tweets[0].Id;
                var tweetResponse = await tc.TweetsV2.GetTweetAsync(tweetId);
                var tweet = tweetResponse.Tweet;
                return tweet.PublicMetrics.ReplyCount;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return 1;

            }

        }


        

        public async Task<object> getBasicWEEKTimeLine(string input)
        {
            //DateTime foo = DateTime.UtcNow.AddDays(-7);
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(input)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                //IncludeRetweets = true,
                ExcludeReplies = false,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };
            var tweets = await tc.Timelines.GetUserTimelineAsync(parameters);
            List<object> weekT = new List<object>();

            foreach (var tweet in tweets)
            {

                //   DateTimeOffset.Parse(string).UtcDateTime
                while ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                {
                    weekT.Add(tweet);
                    break;
                }

            }
            return weekT;

            //  return tweets;

        }
        public async Task<object> serchLastHashtag(string input)
        {
            //DateTime foo = DateTime.UtcNow.AddDays(-7);
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(input)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                ///  IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };
            var tweets = await tc.Timelines.GetUserTimelineAsync(parameters);
            List<object> weekT = new List<object>();

            var lasthashtag = "";
            foreach (var tweet in tweets)
            {
                if (tweet.Entities.Hashtags.Count > 0)
                {
                    lasthashtag = tweet.Entities.Hashtags[0].Text;
                    break;
                }

            } 
            return lasthashtag;




        }

        public async Task<object> GotMoreRetweets(string inputa, string inputb)
        {
            //DateTime foo = DateTime.UtcNow.AddDays(-7);
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(inputa)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };
            var tweetsA = await tc.Timelines.GetUserTimelineAsync(parameters);
            var parametersb = new GetUserTimelineParameters(inputb)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };
            try
            {
                var tweetsB = await tc.Timelines.GetUserTimelineAsync(parametersb);

                var countA = 0;
                var countB = 0;
                foreach (var tweet in tweetsA)
                {

                    //   DateTimeOffset.Parse(string).UtcDateTime
                    if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                    {
                        countA += tweet.RetweetCount;
                    }
                    else break;

                }
                foreach (var tweet in tweetsB)
                {

                    //   DateTimeOffset.Parse(string).UtcDateTime
                    if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                    {
                        countB += tweet.RetweetCount;
                    }
                    else break;

                }
                if (countA > countB)
                    return inputa;
                else return inputb;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return inputb;

            }

        }
        public async Task<object> GotMoreLikes(string inputa, string inputb)
        {
            //DateTime foo = DateTime.UtcNow.AddDays(-7);
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(inputa)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };
            var tweetsA = await tc.Timelines.GetUserTimelineAsync(parameters);
            var parametersb = new GetUserTimelineParameters(inputb)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                IncludeRetweets = true,
                ExcludeReplies = true,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };
            try
            {
                var tweetsB = await tc.Timelines.GetUserTimelineAsync(parametersb);

                var countA = 0;
                var countB = 0;
                foreach (var tweet in tweetsA)
                {

                    //   DateTimeOffset.Parse(string).UtcDateTime
                    if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                    {
                        countA += tweet.FavoriteCount;
                    }
                    else break;

                }
                foreach (var tweet in tweetsB)
                {

                    //   DateTimeOffset.Parse(string).UtcDateTime
                    if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                    {
                        countB += tweet.FavoriteCount;
                    }
                    else break;

                }
                if (countA > countB)
                    return inputa;
                else return inputb;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return inputb;

            }

        }

        public async Task<object> getBasicWEEKTimeLine2brands(string inputa, string inputb)
        {
            //DateTime foo = DateTime.UtcNow.AddDays(-7);
            var tc = new TwitterClient(_API_key, _API_key_secret, access_token, access_token_secret);
            var parameters = new GetUserTimelineParameters(inputa)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                ///  IncludeRetweets = true,
                ExcludeReplies = false,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };

            var tweetsA = await tc.Timelines.GetUserTimelineAsync(parameters);
            var parametersb = new GetUserTimelineParameters(inputb)
            {//מסננים לציר זמן כשכולם שקר מוצא אתציר הזמן המלא


                // SinceId = ((DateTimeOffset)foo).ToUnixTimeSeconds(),
                //SinceId = (DateTime.Now.AddDays(-7)).format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a")

                IncludeContributorDetails = true,
                IncludeEntities = true,
                ///  IncludeRetweets = true,
                ExcludeReplies = false,//כשזה אמת מוצא ציר זמ ן של פירסום 

            };
            try
            {
                var tweetsB = await tc.Timelines.GetUserTimelineAsync(parametersb);

                var countA = 0;
                var countB = 0;
                foreach (var tweet in tweetsA)
                {

                    //   DateTimeOffset.Parse(string).UtcDateTime
                    if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                    {
                        countA += tweet.RetweetCount;
                    }
                    else break;

                }
                foreach (var tweet in tweetsB)
                {

                    //   DateTimeOffset.Parse(string).UtcDateTime
                    if ((DateTime.Now - tweet.CreatedAt.Date).TotalDays <= 8)
                    {
                        countB += tweet.RetweetCount;
                    }
                    else break;

                }
                if (countA > countB)
                    return inputa;
                else return inputb;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return inputb;

            }

        }
     }
    }


/*
 

   פופולריות 
   __________
   כמות עוקבים 
    חלקי
 ExcludeReplies- אמת         
     ______
   
  לייקים +תגובות +ציוצים 
       חלקי  
  ExcludeReplies- שקר         

     */
