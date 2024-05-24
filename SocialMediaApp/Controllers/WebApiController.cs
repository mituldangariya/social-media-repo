using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using SocialMediaApp.Context;
using SocialMediaApp.Models;
using System.Data.Entity;
using System.Security.Claims;

namespace SocialMediaApp.Controllers
{
    [RoutePrefix("api/WebApi")]
    public class WebApiController : ApiController
    {
        SocialMediaAppEntities db = new SocialMediaAppEntities();


        string connectionString = "Server=WIN-45H7NV850H9\\SQLEXPRESS;Database=SocialMediaApp;Integrated Security=True;";



        [HttpGet]
        [Route("GetUserData/{currentUserId}")]
        public IHttpActionResult GetUserData(int currentUserId)
        {
            try
            {
                var usersNotFriends = db.UserDatas
                .Where(u => u.UserId != currentUserId)
                .Select(user => new
                {
                    UserId = user.UserId,
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    ProfilePhoto = user.ProfilePhoto,
                    IsFriend = db.UserFriends.Any(f => (f.UserId == currentUserId && f.FollowerId == user.UserId) ||
                                                       (f.UserId == user.UserId && f.FollowerId == currentUserId)),
                    RequestStatus = db.UserFriends.Where(f => (f.UserId == currentUserId && f.FollowerId == user.UserId) ||
                                                               (f.UserId == user.UserId && f.FollowerId == currentUserId))
                                  .Select(f => f.RequestStatus).FirstOrDefault(),
                    FollowerId = db.UserFriends.Where(f => (f.UserId == currentUserId && f.FollowerId == user.UserId) ||
                                                 (f.UserId == user.UserId && f.FollowerId == currentUserId))
                    .Select(f => f.FollowerId)
                    .FirstOrDefault()
                }).ToList();
                return Ok(usersNotFriends);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        /*  [HttpGet]
          [Route("GetUserData")]
          public IHttpActionResult GetUserData()
          {
              try
              {
                  List<UserData> users = new List<UserData>();

                  string connectionString = "Server=WIN-45H7NV850H9\\SQLEXPRESS;Database=SocialMediaApp;Integrated Security=True;";

                  using (SqlConnection connection = new SqlConnection(connectionString))
                  {
                      connection.Open();

                      SqlCommand command = new SqlCommand("GetUserData", connection);
                      command.CommandType = System.Data.CommandType.StoredProcedure;

                      SqlDataReader reader = command.ExecuteReader();

                      while (reader.Read())
                      {
                          UserData user = new UserData
                          {
                              UserId = reader.GetInt32(0),
                              LastName = reader.GetString(1),
                              FirstName = reader.GetString(2),
                              ProfilePhoto = reader.GetString(3)
                          };
                          users.Add(user);
                      }

                      reader.Close();
                  }

                  return Ok(users);
              }
              catch (Exception ex)
              {
                  return InternalServerError(ex);
              }
          }*/







        [HttpPost]
        [Route("uploadprofilephoto/{id}")]
        public IHttpActionResult UploadProfilePhoto(int id)
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var postedFile = httpRequest.Files[0];
                if (postedFile != null && postedFile.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(postedFile.FileName);
                    var filePath = Path.Combine(HttpContext.Current.Server.MapPath("~/postupload/"), fileName);
                    postedFile.SaveAs(filePath);
                    var userId = id;
                    var user = db.UserDatas.Find(userId);
                    if (user != null)
                    {
                        user.ProfilePhoto = "/postupload/" + fileName;
                        db.SaveChanges();
                        return Ok(new { Message = "Profile photo updated successfully", ProfilePhoto = user.ProfilePhoto });
                    }
                }
            }
            return BadRequest("No file uploaded or file is empty");
        }












        [HttpGet]
        [Route("Login")]
        public IHttpActionResult GetUser(string email, string password)
        {
            UserData user = db.UserDatas.FirstOrDefault(x => x.Email == email && x.UserPassword == password);
            if (user != null)
            {
                var userInfo = new User
                {
                    UserId = user.UserId,
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    City = user.City,
                    Email = user.Email,
                    UserPassword = user.UserPassword,
                    Gender = user.Gender,
                    ProfilePhoto = user.ProfilePhoto,
                    Interests = user.Interests,
                    PhoneNumber = user.PhoneNumber,
                    Bio = user.Bio,
                    BirthDate = user.BirthDate,
                    Posts = user.UserPosts.Select(post => new Post
                    {
                        PostId = post.PostId,
                        PostContent = post.PostContent,
                        PostPhoto = post.PostPhoto,
                        PostDate = post.PostDate,
                        LikeCount = post.LikeCount,
                        CommentCount = post.CommentCount,
                        ShareCount = post.ShareCount
                    }).ToList()
                };
                return Ok(userInfo);
            }
            return Unauthorized();
        }

        [HttpGet]
        [Route("{id}")]



        public IHttpActionResult GetUserById(int id)
        {
            UserData user = db.UserDatas.FirstOrDefault(x => x.UserId == id);
            if (user != null)
            {
                var userInfo = new User
                {
                    UserId = user.UserId,
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    City = user.City,
                    Email = user.Email,
                    UserPassword = user.UserPassword,
                    Gender = user.Gender,
                    ProfilePhoto = user.ProfilePhoto,
                    Interests = user.Interests,
                    PhoneNumber = user.PhoneNumber,
                    Bio = user.Bio,
                    BirthDate = user.BirthDate,
                    Posts = user.UserPosts.Select(post => new Post
                    {
                        PostId = post.PostId,
                        PostContent = post.PostContent,
                        PostPhoto = post.PostPhoto,
                        PostDate = post.PostDate,
                        LikeCount = post.LikeCount,
                        CommentCount = post.CommentCount,
                        ShareCount = post.ShareCount
                    }).ToList()
                };
                return Ok(userInfo);
            }
            return Unauthorized();
        }


        /* public IHttpActionResult GetUserById(int id)
         {
             var userInfo = db.Database.SqlQuery<UserInfo>("GetUserById @UserId",
                 new SqlParameter("UserId", id))
                 .SingleOrDefault();

             if (userInfo != null)
             {
                 return Ok(userInfo);
             }
             return Unauthorized();
         }*/


        [HttpPost]
        [Route("Register")]
        public IHttpActionResult AddUser(UserData user)
        {
            if (user.Email != null && user.UserPassword != null)
            {

                user.ProfilePhoto = "/postupload/profile.png";





                db.UserDatas.Add(user);
                db.SaveChanges();
                return Ok();
            }
            return Unauthorized();
        }

        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult UpdateUserInfo([FromBody] UserData user, int id)
        {
            var userToUpdate = db.UserDatas.FirstOrDefault(x => x.UserId == id);
            if (userToUpdate != null)
            {
                userToUpdate.FirstName = user.FirstName;
                userToUpdate.LastName = user.LastName;
                userToUpdate.City = user.City;
                userToUpdate.UserPassword = user.UserPassword;
                userToUpdate.Email = user.Email;
                userToUpdate.Gender = user.Gender;
                userToUpdate.Interests = user.Interests;
                /* userToUpdate.ProfilePhoto = "/images/" + user.ProfilePhoto;*/
                userToUpdate.PhoneNumber = user.PhoneNumber;
                userToUpdate.Bio = user.Bio;
                userToUpdate.BirthDate = user.BirthDate;
                db.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }



        /*  [HttpPost]
          [Route("check-email")]
          public IHttpActionResult CheckEmail([FromBody] UserData request)
          {
              if (request == null || string.IsNullOrWhiteSpace(request.Email))
              {
                  return BadRequest("Invalid email");
              }

              bool emailInUse = db.UserDatas.Any(u => u.Email == request.Email);
              return Ok(new { emailInUse });
          }*/

        [HttpPost]
        [Route("check-email")]
        public IHttpActionResult CheckEmail([FromBody] UserData request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest("Invalid email");
            }


            var existingUser = db.UserDatas.FirstOrDefault(u => u.UserId == request.UserId);

            if (existingUser == null || existingUser.Email != request.Email)
            {
                bool emailInUse = db.UserDatas.Any(u => u.Email == request.Email);
                return Ok(new { emailInUse });
            }

            return Ok(new { emailInUse = false });
        }


        [HttpPost]
        [Route("AddNewPost")]
        public IHttpActionResult AddNewPost()
        {
            var httpRequest = HttpContext.Current.Request;
            var userId = httpRequest.Form["userId"];
            var postContent = httpRequest.Form["PostContent"];
            string imageUrl = null;
            if (httpRequest.Files.Count > 0)
            {
                var postedFile = httpRequest.Files[0];
                if (postedFile != null && postedFile.ContentLength > 0)
                {

                    string fileName = Path.GetFileName(postedFile.FileName);
                    string filePath = "~/images/" + fileName;
                    postedFile.SaveAs(HttpContext.Current.Server.MapPath(filePath));
                    imageUrl = VirtualPathUtility.ToAbsolute(filePath);
                }
            }
            UserPost post = new UserPost
            {
                UserId = Convert.ToInt32(userId),
                PostContent = postContent,
                PostPhoto = imageUrl,
                PostDate = DateTime.Now,
                LikeCount = 0,
                ShareCount = 0,
                CommentCount = 0
            };
            db.UserPosts.Add(post);
            db.SaveChanges();
            return Ok("Post added successfully.");
        }









        /*[HttpPost]
        [Route("AddNewPost")]
        public IHttpActionResult AddNewPost()
        {
            var httpRequest = HttpContext.Current.Request;
            var userId = httpRequest.Form["userId"];
            var postContent = httpRequest.Form["PostContent"];
            if (httpRequest.Files.Count > 0)
            {
                var postedFile = httpRequest.Files[0];
                if (postedFile != null && postedFile.ContentLength > 0)
                {
                    string filePath = Path.Combine(HttpContext.Current.Server.MapPath("~/postupload"), postedFile.FileName);
                    postedFile.SaveAs(filePath);
                    string imageUrl = VirtualPathUtility.ToAbsolute("~/postupload/" + postedFile.FileName);
                    UserPost post = new UserPost
                    {
                        UserId = Convert.ToInt32(userId),
                        PostContent = postContent,
                        PostPhoto = imageUrl,
                        PostDate = DateTime.Now,
                        LikeCount = 0,
                        ShareCount = 0,
                        CommentCount = 0
                    };
                    db.UserPosts.Add(post);
                    db.SaveChanges();
                    return Ok("Post added successfully.");
                }
            }
            return BadRequest("Image file is required to add a post.");
        }*/







        /*[HttpGet]
        [Route("GetLastPost")]
        public IHttpActionResult GetLastPost()
        {
            try
            {
                var lastPost = db.Database.SqlQuery<UserPost>("EXEC GetLastPost").FirstOrDefault();

                if (lastPost != null)
                {
                    return Ok(lastPost);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }*/



        [HttpGet]
        [Route("GetLastPost")]
        public IHttpActionResult GetLastPost()
        {
            using (SocialMediaAppEntities post = new SocialMediaAppEntities())
            {

                SocialMediaAppEntities appEntities = new SocialMediaAppEntities();
                var data = appEntities.GetLastPost();
                return Ok(data);

            }
        }




        [HttpGet]
        [Route("UserPosts")]
        public IHttpActionResult GetUserPosts()
        {
            var postsInfo = db.UserPosts
               .Where(post => post.Status == null || post.Status == "2") // Filter by status code 2 or NULL

               .OrderBy(post => post.PostDate)
                .Select(post => new
                {
                    PostId = post.PostId,
                    UserId = post.UserId,
                    PostContent = post.PostContent,
                    PostPhoto = post.PostPhoto,
                    PostDate = post.PostDate,
                    LikeCount = post.LikeCount,
                    ShareCount = post.ShareCount,
                    CommentCount = post.CommentCount,
                    FirstName = post.UserData.FirstName,
                    LastName = post.UserData.LastName,
                    ProfilePhoto = post.UserData.ProfilePhoto,
                    Status = post.Status,
                    LikeType = post.PostLikes.Select(x => x.LikeType)
                }).ToList();

            var formattedPostsInfo = postsInfo.Select(post => new
            {
                PostId = post.PostId,
                UserId = post.UserId,
                PostContent = post.PostContent,
                PostPhoto = post.PostPhoto,
                PostDate = FormatPostDate(post.PostDate),
                LikeCount = post.LikeCount,
                ShareCount = post.ShareCount,
                CommentCount = post.CommentCount,
                FirstName = post.FirstName,
                LastName = post.LastName,
                ProfilePhoto = post.ProfilePhoto,
                LikeType = post.LikeType,
                Status = post.Status,
            }).ToList();

            return Ok(formattedPostsInfo);
        }



        private string FormatPostDate(DateTime? postDate)
        {
            if (postDate.HasValue)
            {
                TimeSpan timeSincePost = DateTime.Now - postDate.Value;
                if (timeSincePost.TotalMinutes < 1)
                {
                    return "just now";
                }
                else if (timeSincePost.TotalHours < 1)
                {
                    return $"{(int)timeSincePost.TotalMinutes} min ago";
                }
                else if (timeSincePost.TotalDays < 1)
                {
                    return $"{(int)timeSincePost.TotalHours} h ago";
                }
                else if (timeSincePost.TotalDays < 30)
                {
                    return $"{(int)timeSincePost.TotalDays} d ago";
                }
                else
                {
                    // return postDate.Value.ToString("MMM dd, yyyy").ToLower();
                    return postDate.Value.ToString("MMM dd, yyyy");
                }
            }
            else
            {
                return string.Empty;
            }
        }













        /*private string FormatPostDate(DateTime postDate)
        {
            TimeSpan timeSincePost = DateTime.Now - postDate;
            if (timeSincePost.TotalMinutes < 1)
            {
                return "Just now";
            }
            else if (timeSincePost.TotalHours < 1)
            {
                return $"{(int)timeSincePost.TotalMinutes} min ago";
            }
            else if (timeSincePost.TotalDays < 1)
            {
                return $"{(int)timeSincePost.TotalHours} h ago";
            }
            else
            {
                return postDate.ToString("MMM dd, yyyy");
            }
        }*/


        [HttpPost]
        [Route("LikePost")]
        public IHttpActionResult LikePost([FromBody] PostLike request)
        {
            var post = db.UserPosts.Find(request.PostId);
            if (post == null)
            {
                return NotFound();
            }

            var userLike = db.PostLikes.FirstOrDefault(l => l.PostId == request.PostId && l.UserId == request.UserId);

            if (userLike == null)
            {
                var like = new PostLike
                {
                    PostId = request.PostId,
                    UserId = request.UserId,
                    LikeType = request.LikeType,
                    LikeDate = DateTime.Now
                };

                db.PostLikes.Add(like);
                post.LikeCount++;
            }
            else
            {
                db.PostLikes.Remove(userLike);
                post.LikeCount--;
            }

            db.SaveChanges();
            return Ok(new { likeCount = post.LikeCount });
        }

        //[HttpPost]
        //[Route("LikePost")]
        //public IHttpActionResult LikePost([FromBody] PostLike request)
        //{
        //    var post = db.UserPosts.Find(request.PostId);
        //    if (post == null)
        //    {
        //        return NotFound();
        //    }
        //    var userLike = db.PostLikes.FirstOrDefault(l => l.PostId == request.PostId && l.UserId == request.UserId);
        //    if (userLike == null)
        //    {
        //        var like = new PostLike
        //        {
        //            PostId = request.PostId,
        //            UserId = request.UserId,
        //            LikeDate = DateTime.Now
        //        };
        //        db.PostLikes.Add(like);
        //        post.LikeCount++;
        //    }
        //    else
        //    {
        //        db.PostLikes.Remove(userLike);
        //        post.LikeCount--;
        //    }
        //    db.SaveChanges();
        //    return Ok(new { likeCount = post.LikeCount });
        //}


        /*[HttpPost]
        [Route("AddComment")]
        public IHttpActionResult AddComment(PostComment model)
        {
            if (ModelState.IsValid)
            {
                var comment = new PostComment
                {
                    PostId = model.PostId,
                    UserId = model.UserId,
                    CommentText = model.CommentText,
                    CommentDate = DateTime.Now,
                };
                db.PostComments.Add(comment);
                db.SaveChanges();
                var post = db.UserPosts.Find(comment.PostId);
                post.CommentCount++;
                db.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }*/



        [HttpPost]
        [Route("AddComment")]
        public IHttpActionResult AddComment(PostComment model)
        {
            if (ModelState.IsValid)
            {
                var parameters = new[]
                {
                     new SqlParameter("@PostId", model.PostId),
                     new SqlParameter("@UserId", model.UserId),
                     new SqlParameter("@CommentText", model.CommentText),
                     new SqlParameter("@CommentDate", DateTime.Now)
        };

                db.Database.ExecuteSqlCommand("EXEC AddCommentSP @PostId, @UserId, @CommentText, @CommentDate", parameters);

                return Ok();
            }

            return BadRequest();
        }








        /* [HttpGet]
         [Route("GetLastComment")]
         public IHttpActionResult GetLastComment()
         {
             using (SocialMediaAppEntities post = new SocialMediaAppEntities())
             {

                 SocialMediaAppEntities getlastcommnet = new SocialMediaAppEntities();
                 var data = getlastcommnet.GetLastComment();
                 return Ok(data);

             }
         }
 */
        [HttpGet]
        [Route("GetLastComment")]
        public IHttpActionResult GetLastComment()
        {
            using (SocialMediaAppEntities context = new SocialMediaAppEntities())
            {
                var lastComment = context.PostComments
                    .Include(pc => pc.UserData) // Ensure User data is included
                                   .OrderByDescending(pc => pc.CommentId)
                               /*  .OrderBy(pc => pc.CommentId)*/

                    .Select(pc => new
                    {
                        pc.CommentId,
                        pc.UserId,
                        pc.CommentText,
                        ProfilePhoto = pc.UserData.ProfilePhoto,
                        FirstName = pc.UserData.FirstName,
                        LastName = pc.UserData.LastName
                        // Add other properties as needed
                    })
                    .FirstOrDefault();

                if (lastComment == null)
                {
                    return NotFound();
                }

                return Ok(lastComment);
            }
        }



        [HttpPut]
        [Route("Deletepost/{id}")]
        public IHttpActionResult Deletepost(int id)
        {
            var post = db.UserPosts.Find(id);
            if (post != null)
            {
                post.Status = "1";
                db.SaveChanges();
                return Ok();
            }
            return BadRequest("Post Not Deleted");
        }




        [HttpGet]
        [Route("GetPostComments/{postId}")]
        public IHttpActionResult GetPostComments(int postId)
        {
            var comments = db.PostComments
                .Where(c => c.PostId == postId)
                .Select(c => new
                {
                    c.CommentId,
                    c.CommentText,
                    c.CommentDate,
                    c.UserId,
                    UserName = c.UserData.FirstName + " " + c.UserData.LastName,
                    ProfilePhoto = c.UserData.ProfilePhoto
                })
                .ToList();

            var formattedComments = comments.Select(c => new
            {
                c.CommentId,
                c.CommentText,
                CommentDate = FormatCommentDate(c.CommentDate),
                c.UserName,
                c.UserId,
                c.ProfilePhoto
            }).ToList();

            return Ok(formattedComments);
        }






        /*      [HttpGet]
              [Route("GetPostComments/{postId}")]
              public IHttpActionResult GetPostComments(int postId)
              {
                  List<Comment> comments = new List<Comment>();

                  using (var connection = new SqlConnection("connectionString"))
                  {
                      connection.Open();

                      SqlCommand command = new SqlCommand("GetPostCommentsSP", connection);
                      command.CommandType = CommandType.StoredProcedure;
                      command.Parameters.AddWithValue("@PostId", postId);

                      using (SqlDataReader reader = command.ExecuteReader())
                      {
                          while (reader.Read())
                          {
                              Comment comment = new Comment
                              {
                                  CommentId = Convert.ToInt32(reader["CommentId"]),
                                  CommentText = reader["CommentText"].ToString(),
                                  CommentDate = Convert.ToDateTime(reader["CommentDate"]),
                                  UserName = reader["UserName"].ToString(),
                                  ProfilePhoto = reader["ProfilePhoto"].ToString()
                              };
                              comments.Add(comment);
                          }
                      }
                  }


                  var formattedComments = comments.Select(c => new
                  {
                      c.CommentId,
                      c.CommentText,
                      CommentDate = FormatCommentDate(c.CommentDate),
                      c.UserName,
                      c.ProfilePhoto
                  }).ToList();

                  return Ok(formattedComments);
              }*/






        private string FormatCommentDate(DateTime? commentDate)
        {
            if (commentDate == null)
            {
                return string.Empty;
            }

            TimeSpan timeSinceComment = DateTime.Now - commentDate.Value;
            if (timeSinceComment.TotalMinutes < 1)
            {
                return "Just now";
            }
            else if (timeSinceComment.TotalHours < 1)
            {
                return $"{(int)timeSinceComment.TotalMinutes} min ago";
            }
            else if (timeSinceComment.TotalDays < 1)
            {
                return $"{(int)timeSinceComment.TotalHours} h ago";
            }
            else if (timeSinceComment.TotalDays < 30)
            {
                return $"{(int)timeSinceComment.TotalDays} d ago";
            }
            else
            {
                return commentDate.Value.ToString("MM dd, yyyy");
            }
        }

        /* [HttpDelete]
         [Route("DeleteComment/{commentId}")]
         public IHttpActionResult DeleteComment(int commentId)
         {
             var commentToDelete = db.PostComments.FirstOrDefault(c => c.CommentId == commentId);
             if (commentToDelete != null)
             {
                 db.PostComments.Remove(commentToDelete);


                 db.SaveChanges();
                 return Ok(commentToDelete);
             }
             else
             {
                 return NotFound();
             }
         }*/


        [HttpDelete]
        [Route("DeleteComment/{commentId}")]
        public IHttpActionResult DeleteComment(int commentId)
        {

            var commentToDelete = db.PostComments.FirstOrDefault(c => c.CommentId == commentId);
            if (commentToDelete != null)
            {
                var post = db.UserPosts.Find(commentToDelete.PostId);
                if (post != null)
                {
                    post.CommentCount--;
                }

                db.PostComments.Remove(commentToDelete);
                db.SaveChanges();

                return Ok();
            }
            else
            {
                return NotFound();
            }
        }





        [HttpGet]
        [Route("UserPosts1/{userId}")]
        public IHttpActionResult GetUserPosts1(int userId)
        {
            var postsInfo = db.UserPosts
        .Where(post => post.Status == null || post.Status == "2")
                .OrderBy(post => post.PostDate)
                .Select(post => new
                {
                    PostId = post.PostId,
                    UserId = post.UserId,
                    PostContent = post.PostContent,
                    PostPhoto = post.PostPhoto,
                    PostDate = post.PostDate,
                    LikeCount = post.LikeCount,
                    ShareCount = post.ShareCount,
                    CommentCount = post.CommentCount,
                    FirstName = post.UserData.FirstName,
                    LastName = post.UserData.LastName,
                    ProfilePhoto = post.UserData.ProfilePhoto,
                    Status = post.Status,
                    LikeType = post.PostLikes.Select(x => x.LikeType)
                }).ToList();

            var formattedPostsInfo = postsInfo.Select(post => new
            {
                PostId = post.PostId,
                UserId = post.UserId,
                PostContent = post.PostContent,
                PostPhoto = post.PostPhoto,
                PostDate = FormatPostDate(post.PostDate),
                LikeCount = post.LikeCount,
                ShareCount = post.ShareCount,
                CommentCount = post.CommentCount,
                FirstName = post.FirstName,
                LastName = post.LastName,
                ProfilePhoto = post.ProfilePhoto,
                LikeType = post.LikeType,
                Status = post.Status,
            }).ToList();

            return Ok(formattedPostsInfo);
        }








        [HttpPut]
        [Route("addarchievepost/{id}")]
        public IHttpActionResult addarchievepost(int id)
        {
            var post = db.UserPosts.Find(id);
            if (post != null)
            {
                post.Status = "2";
                db.SaveChanges();
                return Ok();
            }
            return BadRequest("Post Not Deleted");
        }




        [HttpPut]
        [Route("removearchievepost/{id}")]
        public IHttpActionResult removearchievepost(int id)
        {
            var post = db.UserPosts.Find(id);
            if (post != null)
            {
                post.Status = "0";
                db.SaveChanges();
                return Ok();
            }
            return BadRequest("Post Not Deleted");
        }







        /* [HttpGet]
         [Route("notifications")]
         public IHttpActionResult GetNotifications()
         {
             SocialMediaAppEntities appEntities = new SocialMediaAppEntities();
             var data = appEntities.GetNotifications();
             return Ok(data);
         }*/



        [HttpGet]
        [Route("notifications/{userId}")]
        public IHttpActionResult GetUserNotifications(int userId)
        {
            var notifications = db.Notifications
        .Where(n => n.NotificationSenderUserID == userId && n.UserID != userId)
                .OrderByDescending(n => n.NotificationTimestamp)
                .Select(n => new
                {
                    NotificationText = n.NotificationText,
                    NotificationTimestamp = n.NotificationTimestamp,
                    PostId = n.PostId,
                    PostPhoto = n.PostPhoto,
                    PostContent = n.PostContent,
                    ProfilePhoto = n.ProfilePhoto

                }).ToList();

            return Ok(notifications);
        }





        [HttpPost]
        [Route("AddFriend")]
        public IHttpActionResult AddFriend(UserFriend request)
        {
            int currentUserId = (int)request.FollowerId;
            if (request.UserId == currentUserId)
                return BadRequest("You cannot add yourself as a friend.");
            bool isFriendshipExisting = db.UserFriends
                .Any(f => (f.UserId == currentUserId && f.FollowerId == request.UserId) ||
                          (f.UserId == request.UserId && f.FollowerId == currentUserId));
            if (isFriendshipExisting)
                return BadRequest("Friendship already exists.");
            UserFriend newFriendship = new UserFriend
            {
                UserId = currentUserId,
                FollowerId = request.UserId,
                IsFriend = 1,
                RequestStatus = "pending"
            };
            db.UserFriends.Add(newFriendship);
            db.SaveChanges();
            return Ok();
        }


        [HttpPost]
        [Route("RemoveFriend")]
        public IHttpActionResult RemoveFriend(UserFriend request)
        {
            int currentUserId = (int)request.UserId;
            int friendId = (int)request.FollowerId;
            var existingFriendship = db.UserFriends
                .FirstOrDefault(f => (f.UserId == currentUserId && f.FollowerId == friendId) ||
                                      (f.UserId == friendId && f.FollowerId == currentUserId));
            if (existingFriendship == null)
                return BadRequest("Friendship does not exist.");
            db.UserFriends.Remove(existingFriendship);
            db.SaveChanges();
            return Ok();
        }




        [HttpPost]
        [Route("ConfirmFriendRequest")]
        public IHttpActionResult ConfirmFriendRequest(UserFriend request)
        {
            int currentUserId = (int)request.UserId;
            int friendId = (int)request.FollowerId;
            var friendRequest = db.UserFriends.FirstOrDefault(f => (f.UserId == currentUserId && f.FollowerId == friendId) ||
                                                                   (f.UserId == friendId && f.FollowerId == currentUserId));
            if (friendRequest != null)
            {
                friendRequest.RequestStatus = "accepted";
                friendRequest.IsFriend = 2;
                db.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest("Friend request not found.");
            }
        }


    }


    /* [HttpGet]
     [Route("GetAcceptedFriends")]
     public IHttpActionResult GetAcceptedFriends()
     {
         if (HttpContext.Current.Session["UserId"] == null)
             return Unauthorized();

         int userId = (int)HttpContext.Current.Session["UserId"];

         var friends = db.UserFollows
             .Where(f => (f.UserId == userId || f.ReceiverId == userId) && f.Status == "accepted")
             .Select(f => new { UserName = f.UserData.LastName })
             .ToList();

         return Ok(friends);
     }*/








}
