﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SocialMediaApp.Context
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class SocialMediaAppEntities : DbContext
    {
        public SocialMediaAppEntities()
            : base("name=SocialMediaAppEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<UserData> UserDatas { get; set; }
        public virtual DbSet<UserPost> UserPosts { get; set; }
        public virtual DbSet<PostComment> PostComments { get; set; }
        public virtual DbSet<PostLike> PostLikes { get; set; }
        public virtual DbSet<PostLikeRequest> PostLikeRequests { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<UserFriend> UserFriends { get; set; }
    
        public virtual int AddCommentSP(Nullable<int> postId, Nullable<int> userId, string commentText, Nullable<System.DateTime> commentDate)
        {
            var postIdParameter = postId.HasValue ?
                new ObjectParameter("PostId", postId) :
                new ObjectParameter("PostId", typeof(int));
    
            var userIdParameter = userId.HasValue ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(int));
    
            var commentTextParameter = commentText != null ?
                new ObjectParameter("CommentText", commentText) :
                new ObjectParameter("CommentText", typeof(string));
    
            var commentDateParameter = commentDate.HasValue ?
                new ObjectParameter("CommentDate", commentDate) :
                new ObjectParameter("CommentDate", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("AddCommentSP", postIdParameter, userIdParameter, commentTextParameter, commentDateParameter);
        }
    
        public virtual int AddPost(Nullable<int> userId, string postContent, string postPhoto, Nullable<System.DateTime> postDate, Nullable<int> likeCount, Nullable<int> shareCount, Nullable<int> commentCount)
        {
            var userIdParameter = userId.HasValue ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(int));
    
            var postContentParameter = postContent != null ?
                new ObjectParameter("PostContent", postContent) :
                new ObjectParameter("PostContent", typeof(string));
    
            var postPhotoParameter = postPhoto != null ?
                new ObjectParameter("PostPhoto", postPhoto) :
                new ObjectParameter("PostPhoto", typeof(string));
    
            var postDateParameter = postDate.HasValue ?
                new ObjectParameter("PostDate", postDate) :
                new ObjectParameter("PostDate", typeof(System.DateTime));
    
            var likeCountParameter = likeCount.HasValue ?
                new ObjectParameter("LikeCount", likeCount) :
                new ObjectParameter("LikeCount", typeof(int));
    
            var shareCountParameter = shareCount.HasValue ?
                new ObjectParameter("ShareCount", shareCount) :
                new ObjectParameter("ShareCount", typeof(int));
    
            var commentCountParameter = commentCount.HasValue ?
                new ObjectParameter("CommentCount", commentCount) :
                new ObjectParameter("CommentCount", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("AddPost", userIdParameter, postContentParameter, postPhotoParameter, postDateParameter, likeCountParameter, shareCountParameter, commentCountParameter);
        }
    
        public virtual ObjectResult<Nullable<int>> DeleteComment(Nullable<int> commentId)
        {
            var commentIdParameter = commentId.HasValue ?
                new ObjectParameter("CommentId", commentId) :
                new ObjectParameter("CommentId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("DeleteComment", commentIdParameter);
        }
    
        public virtual ObjectResult<GetLastPost_Result> GetLastPost()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetLastPost_Result>("GetLastPost");
        }
    
        public virtual ObjectResult<GetLastPostForUser_Result> GetLastPostForUser(Nullable<int> userId)
        {
            var userIdParameter = userId.HasValue ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetLastPostForUser_Result>("GetLastPostForUser", userIdParameter);
        }
    
        public virtual ObjectResult<GetPostCommentsSP_Result> GetPostCommentsSP(Nullable<int> postId)
        {
            var postIdParameter = postId.HasValue ?
                new ObjectParameter("PostId", postId) :
                new ObjectParameter("PostId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetPostCommentsSP_Result>("GetPostCommentsSP", postIdParameter);
        }
    
        public virtual ObjectResult<GetUserById_Result> GetUserById(Nullable<int> userId)
        {
            var userIdParameter = userId.HasValue ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetUserById_Result>("GetUserById", userIdParameter);
        }
    
        public virtual ObjectResult<GetUserData_Result> GetUserData()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetUserData_Result>("GetUserData");
        }
    
        public virtual ObjectResult<GetLastComment_Result> GetLastComment()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetLastComment_Result>("GetLastComment");
        }
    
        public virtual ObjectResult<GetNotifications_Result> GetNotifications()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetNotifications_Result>("GetNotifications");
        }
    
        public virtual int AddArchivePostSP(Nullable<int> postId)
        {
            var postIdParameter = postId.HasValue ?
                new ObjectParameter("PostId", postId) :
                new ObjectParameter("PostId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("AddArchivePostSP", postIdParameter);
        }
    
        public virtual ObjectResult<GetUserNotificationsSP_Result> GetUserNotificationsSP(Nullable<int> userId)
        {
            var userIdParameter = userId.HasValue ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetUserNotificationsSP_Result>("GetUserNotificationsSP", userIdParameter);
        }
    }
}
