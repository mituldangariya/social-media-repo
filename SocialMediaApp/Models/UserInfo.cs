using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SocialMediaApp.Context;

namespace SocialMediaApp.Models
{
    public class UserInfo
    {
        
    }
    public class User
    {
        public int UserId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
        public string UserPassword { get; set; }
        public string Gender { get; set; }
        public string ProfilePhoto { get; set; }
        public string Interests { get; set; }
        public string PhoneNumber { get; set; }
        public string Bio { get; set; }
        public DateTime? BirthDate { get; set; }

        public ICollection<Post> Posts { get; set; }
        public virtual ICollection<Like> PostLikes { get; set; }
        public virtual ICollection<Comment> PostComments { get; set; }
    }

    public class Post
    {
        public int PostId { get; set; }
        public Nullable<int> UserId { get; set; }
        public string PostContent { get; set; }
        public string PostPhoto { get; set; }
        public Nullable<System.DateTime> PostDate { get; set; }
        public Nullable<int> LikeCount { get; set; }
        public Nullable<int> CommentCount { get; set; }
        public Nullable<int> ShareCount { get; set; }
        public string Status { get; set; }


        public virtual User UserData { get; set; }

        public string LikeType { get; set; }

        public virtual ICollection<Like> PostLikes { get; set; }
        public virtual ICollection<Comment> PostComments { get; set; }
    }

    public class Like
    {
        public int LikeId { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<int> PostId { get; set; }
        public Nullable<System.DateTime> LikeDate { get; set; }

        public Nullable<int> EmojiTypeId { get; set; }


        public string LikeType { get; set; }


        public virtual Post UserPost { get; set; }
        public virtual User UserData { get; set; }
    }
    public partial class Comment
    {
        public int CommentId { get; set; }
        public Nullable<int> PostId { get; set; }
        public Nullable<int> UserId { get; set; }
        public string CommentText { get; set; }
        public Nullable<System.DateTime> CommentDate { get; set; }
        public Nullable<int> ParentCommentId { get; set; }

        public virtual Post UserPost { get; set; }
        public virtual User UserData { get; set; }
    }

    /* public partial class Follow
     {
         public int FollowId { get; set; }
         public Nullable<int> UserId { get; set; }
         public Nullable<int> ReceiverId { get; set; }
         public string Status { get; set; }

         public Nullable<int> IsFriend { get; set; }

         public virtual UserData UserData { get; set; }
         public virtual UserData UserData1 { get; set; }
     }*/

    public partial class Friend
    {
        public int Id { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<int> FollowerId { get; set; }
        public Nullable<int> IsFriend { get; set; }
        public string RequestStatus { get; set; }

        public virtual UserData UserData { get; set; }
        public virtual UserData UserData1 { get; set; }
    }

    public partial class UserNotification
    {
        public int NotificationID { get; set; }
        public Nullable<int> UserID { get; set; }
        public string NotificationType { get; set; }
        public Nullable<int> NotificationSenderUserID { get; set; }
        public Nullable<int> NotificationPostID { get; set; }
        public string NotificationText { get; set; }
        public Nullable<System.DateTime> NotificationTimestamp { get; set; }
        public string NotificationStatus { get; set; }

        public virtual UserData UserData { get; set; }
        public virtual UserData UserData1 { get; set; }
    }

    /* public partial class Emoji
     {


         public int EmojiTypeId { get; set; }
         public string EmojiName { get; set; }

         public virtual ICollection<PostLike> PostLikes { get; set; }
     }*/

}