$(document).ready(function () {

    var userId = getCookie("userId");
/*    var userId = sessionStorage.getItem('userId');
*/    if (userId) {
        console.log('User ID:', userId);
    } else {
        console.log('User not logged in');
        window.location.href = "/Login/Login";
    }



    $('#notification-menu').hide();
    loadUserPosts();
    populateUserData();
    /*fetchAcceptedFriends();
    fetchAllUsers();*/
    //fetchConfirmFriend();
    FriendList();

    $("#notificationLink").click(function () {
        console.log("flow goes right")
        $('.timeline-div').hide();
        $('.loadMore').hide();
        $('.central-meta').hide();
        $('#notification-menu').show();
    });

    $("#home-element").click(function () {
        $('.loadMore').show();
        $('.central-meta').show();
        $('#notification-menu').hide();
    });

    $("#logoutButton").click(function () {
        sessionStorage.clear();
        window.location.href = "/Login/Login";
    });

    $('#updateButton').click(updateUserInfo);
    $('#changePasswordButton').click(changePassword);
    $('#submitButton').click(UploadPost);

    $('#editinfo-link').click(function () {
        $('#timeline-div').hide();
        $('#editinfo-div').show();
        $('#changepassword-div').hide();
        $('#accepted-follower-div').hide();
        $('#following-div').hide();
        /* $('#post-link').hide();
         $('#archievelink').hide();*/
        $('#post-div').hide();
        $('#archieve-div').hide();

        $('#timeline-link').removeClass('active');
        $('#editinfo-link').addClass('active');
        $('#changepassword-link').removeClass('active');
        $('#followers-link').removeClass('active');
        $('#following-link').removeClass('active');
        $('#post-link').removeClass('active');
        $('#archievelink').removeClass('active');

    });

    $('#changepassword-link').click(function () {
        $('#timeline-div').hide();
        $('#editinfo-div').hide();
        $('#changepassword-div').show();
        $('#accepted-follower-div').hide();
        $('#following-div').hide();
        /* $('#post-link').hide();
         $('#archievelink').hide();*/


        $('#timeline-link').removeClass('active');
        $('#editinfo-link').removeClass('active');
        $('#changepassword-link').addClass('active');
        $('#followers-link').removeClass('active');
        $('#following-link').removeClass('active');
        $('#post-link').removeClass('active');
        $('#archievelink').removeClass('active');
    });

    $('#followers-link').click(function () {
        fetchConfirmFriend();
        $('#timeline-div').hide();
        $('#editinfo-div').hide();
        $('#changepassword-div').hide();
        $('#accepted-follower-div').show();
        $('#following-div').hide();
        /* $('#post-link').hide();
         $('#archievelink').hide();*/
        $('#post-div').hide();
        $('#archieve-div').hide();

        $('#timeline-link').removeClass('active');
        $('#editinfo-link').removeClass('active');
        $('#changepassword-link').removeClass('active');
        $('#followers-link').addClass('active');
        $('#following-link').removeClass('active');
        $('#post-link').removeClass('active');
        $('#archievelink').removeClass('active');

    });

    $('#following-link').click(function () {
        $('#timeline-div').hide();
        $('#editinfo-div').hide();
        $('#changepassword-div').hide();
        $('#accepted-follower-div').hide();
        $('#following-div').show();

        $('#timeline-link').removeClass('active');
        $('#editinfo-link').removeClass('active');
        $('#changepassword-link').removeClass('active');
        $('#followers-link').removeClass('active');
        $('#following-link').addClass('active');
    });




    $('#post-link').click(function () {
        loadUserPostsHomePage();
        $('#timeline-div').hide();
        $('#editinfo-div').hide();
        $('#changepassword-div').hide();
        $('#accepted-follower-div').hide();
        $('#following-div').hide();
        $('#timeline-div').hide();
        $('#post-div').show();
        /* $('#archievelink').hide();*/
        $('#archieve-div').hide();

        $('#timeline-link').removeClass('active');
        $('#editinfo-link').removeClass('active');
        $('#changepassword-link').removeClass('active');
        $('#followers-link').removeClass('active');
        $('#following-link').removeClass('active');
        $('#post-link').addClass('active');
        $('#archievelink').removeClass('active');
    });




    $('#archievelink').click(function () {
        loadarchievepost();
        $('#timeline-div').hide();
        $('#editinfo-div').hide();
        $('#changepassword-div').hide();
        $('#accepted-follower-div').hide();
        $('#following-div').hide();
        $('#timeline-div').hide();
        /*  $('#post-link').hide();*/
        $('#post-div').hide();
        $('#archieve-div').show();

        $('#timeline-link').removeClass('active');
        $('#editinfo-link').removeClass('active');
        $('#changepassword-link').remove('active');
        $('#followers-link').removeClass('active');
        $('#following-link').removeClass('active');
        $('#post-link').removeClass('active');
        $('#archievelink').addClass('active');
    });


    $('#timeline-link').click(function () {
        $('#timeline-div').show();
        $('#editinfo-div').hide();
        $('#changepassword-div').hide();
        $('#followers-div').hide();
        $('#following-div').hide();
        /* $('#post-link').hide();
         $('#archievelink').hide();*/
        $('#post-div').hide();
        $('#archieve-div').hide();


        $('#editinfo-link').removeClass('active');
        $('#timeline-link').addClass('active');
        $('#changepassword-link').removeClass('active');
        $('#followers-link').removeClass('active');
        $('#following-link').removeClass('active');
        $('#post-link').removeClass('active');
        $('#archievelink').removeClass('active');
    });






});

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

$(document).ready(function () {
    // Function to validate email
    function validateEmail(email) {
        const re = /^[^@]+@[^@]+\.[^@]+$/; // Escape the "@" character
        return re.test(email);
    }

    // Function to validate form inputs
    function validateForm() {
        let isValid = true;

        // Validate First Name
        const firstName = $('#TxtFirstName').val();
        if (!firstName) {
            $('#firstNameError').text("Please Enter Your First Name.").show();
            isValid = false;
        } else if (!/^[a-zA-Z]+$/.test(firstName)) {
            $('#firstNameError').text("First Name should only contain alphabetic characters.").show();
            isValid = false;
        } else {
            $('#firstNameError').hide();
        }

        // Validate Last Name
        const lastName = $('#TxtLastName').val();
        if (!lastName) {
            $('#lastNameError').text("Please Enter Your Last Name.").show();
            isValid = false;
        } else if (!/^[a-zA-Z]+$/.test(lastName)) {
            $('#lastNameError').text("Last Name should only contain alphabetic characters.").show();
            isValid = false;
        } else {
            $('#lastNameError').hide();
        }

        // Validate City
        const city = $('#TxtCity').val();
        if (!city) {
            $('#cityError').text("City is required.").show();
            isValid = false;
        } else {
            $('#cityError').hide();
        }

        // Validate Email
        const email = $('#TxtEmail').val();
        if (!email) {
            $('#emailError').text("Please Enter A Valid Email.").show();
            isValid = false;
        } else if (!validateEmail(email)) {
            $('#emailError').text("Valid Email is required.").show();
            isValid = false;
        } else {
            $('#emailError').hide();
        }

        // Validate Phone Number
        const phoneNumber = $('#TxtPhoneNumber').val();
        if (!phoneNumber) {
            $('#phoneError').text("Phone Number is required.").show();
            isValid = false;
        } else if (!/^[0-9]{10,12}$/.test(phoneNumber)) {
            $('#phoneError').text("Phone Number should be 10 to 12 digits long.").show();
            isValid = false;
        } else {
            $('#phoneError').hide();
        }

        // Validate Birth Date
        const birthDate = $('#BirthDate').val();
        if (!birthDate) {
            $('#birthDateError').text("Birth Date is required.").show();
            isValid = false;
        } else {
            $('#birthDateError').hide();
        }

        return isValid;
    }

    // Add click event listener to the update button
    $('#updateButton').on('click', function () {
        if (validateForm()) {
            // If form is valid, submit the form
            $('#myForm').submit();
            // Redirect to the homepage
            window.location.href = '/Login/HomePage';
        } else {
            $("#NewloginError").text("Please correct the errors above.");
        }
    });
});

/*document.getElementById('TxtPhoneNumber').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});*/


function toggleComments(element, postId) {
    var commentArea = $(element).closest('.post-meta').find('.comment-area');
    if (commentArea.is(':visible')) {
        commentArea.hide();
    } else {
        commentArea.show();
        loadPostComments(postId, commentArea.find('.we-comet'));
    }
}





function loadUserPosts() {
    $.ajax({
        url: '/api/WebApi/UserPosts',
        method: 'GET',
        success: function (data) {
            var postsHTML = '';

            data.reverse().forEach(function (post) {
                if (post.Status != 1) {

                    postsHTML += AddPost(post);
                }
            });


            $('#page-contents .loadMore').html(postsHTML);
            $('.we-comet').each(function () {
                var $this = $(this);
                var postId = $this.closest('.central-meta').find('.like-button').data('post-id');
                loadPostComments(postId, $this);
            });





            $('.like-button').click(function () {
                var $this = $(this);
                var postId = $this.data('post-id');
                /* var user = sessionStorage.getItem('userId');*/
                var user = getCookie("userId");
                $.ajax({
                    url: '/api/WebApi/LikePost',
                    method: 'POST',
                    data: { postId: postId, userId: user },
                    success: function (data) {
                        $this.find('ins').text(data.likeCount);
                        if (data.isLiked) {
                            $this.find('i').removeClass('fa-regular fa-heart').addClass('fa-solid fa-heart liked');
                        } else {
                            $this.find('i').removeClass('fa-solid fa-heart liked').addClass('fa-regular fa-heart');
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            });
            $('.post-comt-box button').click(UploadComment);
        },
        error: function (error) {
            console.log(error);
        }

    });

}




document.querySelectorAll('.zoomable').forEach(item => {
    item.addEventListener('transitionend', () => {
        item.style.transition = '';
    });
});


function toggleLike(likeType, postId) {
    const likeIcon = document.getElementById('like');
    const likeCountElement = document.getElementById('like-count');
    const currentLikes = parseInt(likeCountElement.innerText);

    if (likeType === 'liked') {
        likeIcon.classList.remove('fa-heart');
        likeIcon.classList.add('fa-heart-o');
        likeIcon.style.color = '';
        likeCountElement.innerText = currentLikes - 1;

    } else {
        likeIcon.classList.remove('fa-heart-o');
        likeIcon.classList.add('fa-heart');
        likeIcon.style.color = 'red';
        likeCountElement.innerText = currentLikes + 1;

    }
}

/*function renderLikes(likeTypes, likeCount) {
    var emojis = ['😀', '😍', '😂', '😎', '😘', '😅', '💔', '💯'];
    var emojiCounts = {};

    likeTypes.forEach(function (likeType) {
        emojiCounts[likeType] = emojiCounts[likeType] ? emojiCounts[likeType] + 1 : 1;
    });

    var emojisHTML = '';
    for (var emojiId in emojiCounts) {
        if (emojiCounts.hasOwnProperty(emojiId)) {
            var emojiCount = emojiCounts[emojiId];
            if (emojiCount > 0) {
                var emoji = emojis[emojiId - 1];
                emojisHTML += `<span class="emoji">${emoji} <span class="emoji-count">${emojiCount}</span></span>`;
            }
        }
    }
    return emojisHTML;
}*/





function toggleHeartColor() {
    const likeIcon = document.getElementById('like');
    if (likeIcon.style.color === 'black') {
        likeIcon.style.color = 'red';
    } else {
        likeIcon.style.color = 'black';
    }
}









function toggleDeleteButtonVisibility(event) {
    const deleteBtn = event.target.closest('.central-meta').querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.style.display = (deleteBtn.style.display === 'block') ? 'none' : 'block';
    }
}

// Event delegation for dynamically added posts
document.body.addEventListener('click', function (event) {
    const moreIcon = event.target.closest('.more-icon');
    if (moreIcon) {
        toggleDeleteButtonVisibility(event);
    }
});





function AddPost(post) {
    /*var userId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");
    var isLikedClass = post.isLiked ? 'fa-solid fa-heart liked' : 'fa-regular fa-heart';

    var deleteButtonHTML = '';

    if (userId && userId === post.UserId) {
        deleteButtonHTML = `<button class="delete-btn" onClick="deletePost(${post.PostId})">Delete</button>`;
    }


    var postHTML =
        `<div class="central-meta item">
                        <div class="user-post">
                            <div class="friend-info">
                                <figure>

                                     <img src="${post.ProfilePhoto}" alt="" height="54" width="54" id="ProfilePhoto" class="zoomable">

                                    
                                </figure>
                                <div class="friend-name">
                                    <ins>${post.FirstName} ${post.LastName}

                                   ${post.UserId == userId ? ` <i class="fas fa-ellipsis-h more-icon" data-toggle="tooltip" title="More"></i>` : ''}

                                   
                                            <button class="delete-btn" onClick="deletePost(${post.PostId})">Delete</button>
                                            

                           

                                            


                                    </ins>
                                    <span>published: ${post.PostDate}</span>


                                </div>
                                <div class="description">
                                    <p>${post.PostContent}</p>
                                </div>
                                <div class="post-meta">
                                    ${post.PostPhoto ? `<img src="${post.PostPhoto}" alt="" height="208" width="200">` : ''}
                                    <div class="we-video-info">
                                        <ul class="d-flex">
                                            <li>
                                               <span class="views like-button" data-toggle="tooltip" title="like" data-post-id="${post.PostId}">
                                            <i class="${isLikedClass}" id="like"></i> <ins>${post.LikeCount}</ins>
                                        </span>


                                            </li>
                                            <div>
                                            <li>
                                                <span class="comment" data-toggle="tooltip" title="comment" onclick="toggleComments(this, ${post.PostId})">
                                                    <i class="fa fa-comments-o"></i>
                                                    <ins>${post.CommentCount}</ins>
                                                </span>
                                            </li>
                                            <li>
                                              
                                            </li>
                                        </div>
                                        </ul>
                                    </div>
                                    <div class="comment-area" style="display: none;">
                                         <div class="post-comt-box">
                                            <textarea placeholder="Post your comment"></textarea>
                                            <button class="btn-primary" id="Postbtn">Comment</button>
                                        </div>

                                        <ul class="we-comet"></ul>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;


    return postHTML;
}



/*function initializeLikeButton() {
            const likeButton = document.querySelector('.like-button');
            const likeIcon = likeButton.querySelector('.fa-heart');
            const likeCount = document.getElementById('like-count');
            const postId = likeButton.getAttribute('data-post-id');

            likeButton.addEventListener('click', () => {
                const isLiked = likeIcon.classList.contains('fa-solid');
                
                fetch(`/likepost`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ postId: postId, liked: !isLiked })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        if (!isLiked) {
                            likeIcon.classList.remove('fa-regular');
                            likeIcon.classList.add('fa-solid');
                            likeIcon.classList.add('liked');
                            likeCount.textContent = parseInt(likeCount.textContent) + 1;
                        } else {
                            likeIcon.classList.remove('fa-solid');
                            likeIcon.classList.add('fa-regular');
                            likeIcon.classList.remove('liked');
                            likeCount.textContent = parseInt(likeCount.textContent) - 1;
                        }
                    } else {
                        console.error('Error updating like status');
                    }
                })
                .catch(error => console.error('Error:', error));
            });
}

        document.addEventListener('DOMContentLoaded', (event) => {
            initializeLikeButton();
        });*/


function deletePost(postId) {
    $('#custom-confirm-modal').css('display', 'block');

    $('#confirm-delete').on('click', function () {
        $.ajax({
            url: '/api/WebApi/Deletepost/' + postId,
            method: 'PUT',
            success: function (data) {
                $(`.like-button[data-post-id="${postId}"]`).closest('.central-meta.item').hide();
                console.log("Post deleted");
                $('#custom-confirm-modal').css('display', 'none');
            },
            error: function (error) {
                console.error("Error deleting post:", error);
            }
        });
    });

    $('#cancel-delete').on('click', function () {
        console.log("Post deletion canceled");
        $('#custom-confirm-modal').css('display', 'none');
    });
}









/*$(document).ready(function () {*/





/*function FriendList() {
    const userId = sessionStorage.getItem('userId');
    $.ajax({
        url: '/api/WebApi/GetUserData/' + userId,
        method: 'GET',
        success: function (data) {
            var peopleList = $('.friendz-list');
            peopleList.empty();
            if (data.length === 0) {
                peopleList.append('<li>No users found.</li>');
            } else {
                data.forEach(function (user) {
                    var userHTML = `
                    <li>
                        <div style="display: flex;justify-content: space-between;">
                            <figure>
                                <img src="${user.ProfilePhoto}" class="media-object pull-left" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" alt="Profile Photo">
                            </figure>
                            <div style="display: inline;">
                                <i>${user.FirstName} ${user.LastName}</i>
                                <i hidden>${user.UserId}</i>
                            </div>

                            <div style="display: inline;">
                             ${user.IsFriend == 1 && user.FollowerId == userId
                            ? `<button class="btn btn-outline-danger remove-friend-btn" data-user-id="${user.UserId}">Remove</button>`
                            : user.RequestStatus === "pending"
                                ? `<button class="btn btn-outline-primary confirm-friend-btn" data-user-id="${user.UserId}">Confirm</button>
                                            <button class="btn btn-outline-danger remove-friend-btn" data-user-id="${user.UserId}">Remove</button>`
                                : user.RequestStatus === "accepted"
                                    ? `<button class="btn btn-outline-danger remove-friend-btn" data-user-id="${user.UserId}">Remove</button>`
                                    : `<button class="btn btn-outline-secondary add-friend-btn" data-user-id="${user.UserId}">Add Friend</button>`
                        }
                            </div>
                        </div>
                    </li>
                    `;
                    peopleList.append(userHTML);
                });
                $('.add-friend-btn').on('click', function () {
                    var userId = $(this).data('user-id');
                    addFriend(userId);
                });
                $('.remove-friend-btn').on('click', function () {
                    var userId = $(this).data('user-id');
                    removeFriend(userId);
                });
                $('.confirm-friend-btn').on('click', function () {
                    var userId = $(this).data('user-id');
                    confirmFriendRequest(userId);
                });
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}*/

function FriendList() {
    /* const userId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");

    $.ajax({
        url: '/api/WebApi/GetUserData/' + userId,
        method: 'GET',
        success: function (data) {
            var peopleList = $('.friendz-list');
            peopleList.empty();
            if (data.length === 0) {
                peopleList.append('<li>No users found.</li>');
            } else {
                // Sort users based on request status
                data.sort(function (a, b) {
                    if (a.RequestStatus === 'pending' && b.RequestStatus !== 'pending') {
                        return -1; // Move pending requests to the top
                    } else if (a.RequestStatus !== 'pending' && b.RequestStatus === 'pending') {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                data.forEach(function (user) {
                    var userHTML = `
                    <li>
                        <div style="display: flex;justify-content: space-between;">
                            <figure>
                                <img src="${user.ProfilePhoto}" class="media-object pull-left" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" alt="Profile Photo">
                            </figure>
                            <div style="display: inline;">
                                <i>${user.FirstName} ${user.LastName}</i>
                                <i hidden>${user.UserId}</i>
                            </div>

                            <div style="display: inline;">
                             ${user.IsFriend == 1 && user.FollowerId == userId
                            ? `<button class="btn btn-outline-danger remove-friend-btn" data-user-id="${user.UserId}">Remove</button>`
                            : user.RequestStatus === "pending"
                                ? `<button class="btn btn-outline-primary confirm-friend-btn" data-user-id="${user.UserId}">Confirm</button>
                                            <button class="btn btn-outline-danger remove-friend-btn" data-user-id="${user.UserId}">Remove</button>`
                                : user.RequestStatus === "accepted"
                                    ? `<button class="btn btn-outline-danger remove-friend-btn" data-user-id="${user.UserId}">Remove</button>`
                                    : `<button class="btn btn-outline-secondary add-friend-btn" data-user-id="${user.UserId}">Add Friend</button>`
                        }
                            </div>
                        </div>
                    </li>
                    `;
                    peopleList.append(userHTML);
                });
                $('.add-friend-btn').on('click', function () {
                    var userId = $(this).data('user-id');
                    addFriend(userId);
                });
                $('.remove-friend-btn').on('click', function () {
                    var userId = $(this).data('user-id');
                    removeFriend(userId);
                });
                $('.confirm-friend-btn').on('click', function () {
                    var userId = $(this).data('user-id');
                    confirmFriendRequest(userId);
                });
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

//add friend
function addFriend(userId) {
    /*  var currentUserId = sessionStorage.getItem('userId');*/
    var currentUserId = getCookie("userId");

    $.ajax({
        url: '/api/WebApi/AddFriend',
        method: 'POST',
        data: {
            userId: currentUserId,
            followerId: userId
        },
        success: function (data) {
            console.log('Friend added successfully');
            FriendList();
        },
        error: function (error) {
            console.log(error);
        }
    });
}
//remove friend
function removeFriend(friendId) {
    /*  const userId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");

    $.ajax({
        url: '/api/WebApi/RemoveFriend',
        method: 'POST',
        data: { UserId: userId, FollowerId: friendId },
        success: function (response) {
            console.log('Friend removed successfully');
            FriendList();
        },
        error: function (error) {
            console.log(error);
        }
    });
}



//confrim freiend request
function confirmFriendRequest(userId) {
    /* var currentUserId = sessionStorage.getItem('userId');*/
    var currentUserId = getCookie("userId");

    $.ajax({
        url: '/api/WebApi/ConfirmFriendRequest',
        method: 'POST',
        data: {
            userId: currentUserId,
            followerId: userId
        },
        success: function (data) {
            console.log('added');
            FriendList();
        },
        error: function (error) {
            console.log(error);
        }
    });
}



//function fetchAcceptedFriends() {
//    var currentUserId = sessionStorage.getItem('userId');
//    /* console.log("fetchAcceptedFriends");*/

//    $.ajax({
//        url: '/api/WebApi/GetUserData' + currentUserId,
//        type: 'GET',
//        /* data: {
//             UserId: currentUserId,
//             ReceiverId: userId,

//         },*/
//        success: function (response) {

//            $('#acceptUserList').empty();
//            response.forEach(function (user) {
//                if (user.Status === "accepted") {
//                    $('#acceptUserList').append('<li>' + user.UserName + '</li>');
//                }
//            });
//            //$('#accepted-follower-div').show();
//        },
//        error: function (xhr, status, error) {
//            console.log('Error fetching friends:', error);

//        }
//    });
//}



function fetchConfirmFriend() {
    /*  var currentUserId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");


    $.ajax({
        url: '/api/WebApi/GetUserData/' + userId,
        type: 'GET',
        /* data: {
             UserId: currentUserId,
             ReceiverId: userId,
 
         },*/
        success: function (response) {
            $('#acceptUserList').empty();
            response.forEach(function (user) {
                if (user.RequestStatus == "accepted") {
                    console.log('Flow goes right!!!!');
                    var request = `<li>
                        <div style="display: flex;justify-content: space-between;">
                            <figure>
                                <img src="${user.ProfilePhoto}" class="media-object pull-left" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" alt="Profile Photo">
                            </figure>
                                <div style="display: inline;">
                                    <i>${user.FirstName} ${user.LastName}</i>
                                    <i hidden>${user.UserId}</i>
                                </div>
                        </div>
                    </li>`
                    $('#acceptUserList').append(request);
                    console.log(user)
                }
            });
            //$('#followers-div').show();
        },
        error: function (xhr, status, error) {
            console.log('Error fetching friends:', error);
            /*   alert('Error fetching friends. Please try again later.');*/
        }
    });
}




function uploadProfilePhoto() {
    /* var currentUserId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");

    var formData = new FormData();
    var fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        formData.append('profilePhoto', fileInput.files[0]);
        $.ajax({
            url: '/api/WebApi/uploadprofilephoto/' + userId,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                /* console.log("update");
                 $('#c').attr('src', response.ProfilePhoto);*/
                $('#ProfilePhoto').attr('src', response.ProfilePhoto);
                alert('Profile photo uploaded successfully!');
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else {
        alert('Please select a file');
    }
}







//show replies
function ShowReplies(replies) {
    /* const userId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");
    let replyHTML = '';
    if (replies && replies.length > 0) {
        replies.forEach(function (reply) {
            replyHTML += `
            <li class="reply-item">
                <div class="comet-avatar">
                    <img src="${reply.ProfilePhoto}" alt="" height="45" width="45">
                </div>
                <div class="we-comment">
                    <div class="coment-head">
                        <h5>${reply.UserName}</h5>
                        <span>${reply.CommentDate}</span>
                        <i hidden>${reply.CommentId}</i>
                        ${reply.UserId == userId ? '<i class="fa-solid fa-ellipsis"></i>' : ''}
                        <div class="comment-options" style="display: none;">
                            <button class="btn btn-danger delete-reply-btn">Delete</button>
                        </div>
                    </div>
                    <p>${reply.CommentText}</p>
                </div>
            </li>
        `;
        });
    }
    return replyHTML;
}




function loadPostComments(postId, $commentsList) {
    /*  var currentUserId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");
    $.ajax({
        url: '/api/WebApi/GetPostComments/' + postId,
        method: 'GET',
        success: function (comments) {
            $commentsList.empty();

            if (comments.length === 0) {
                /* $commentsList.append('<li id="NoComments">No comments yet.</li>');*/
            } else {
                comments.forEach(function (comment) {
                    const commentHtml = `
                    <li data-comment-id="${comment.Id}">
                        <div class="comet-avatar">
                            <img src="${comment.ProfilePhoto}" alt="" height="40" width="40" id="ProfilePhoto">
                        </div>
                        <div class="we-comment">
                            <div class="coment-head">
                                <h5>${comment.UserName}</h5>
                                <span hidden>${comment.CommentId}</span>
                                <span>${comment.CommentDate}</span>
                                     <i class="fa-solid fa-share"></i>
                                    

                                ${comment.UserId == userId ? `
                                <div class="comment-options">   
                                  <div class="comment-options">
                                       <button class="delete-comment-btn custom-style" onclick="deleteComment(${comment.CommentId})">Delete Comment</button>
                                   </div>



                                </div>` : ''}
                            </div>


                            <p>${comment.CommentText}</p>
                        </div>

    <style>
    .modal-content {
        max-width: 400px; 
        margin: auto; 
        width: auto;
        top: 50%;
        padding: 11px;
    }
button#submitReply {
    width: 100px;
}

    
    .close {
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
</style>

<div id="replyModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3>Reply to Comment</h3>
        <textarea id="replyText" placeholder="Enter your reply" autofocus></textarea>
        <button class="btn btn-success" id="submitReply">Reply Comment</button>
    </div>
</div>


                    </li>`;



                    $commentsList.append(commentHtml);
                });


                $commentsList.find('.fa-share').click(function () {
                    var commentId = $(this).closest('li').find('span[hidden]').text();
                    replieComment(commentId, postId);
                });
                $commentsList.find('.delete-reply-btn').click(function () {
                    var commentId = $(this).closest('li').find('i[hidden]').text();
                    var $reply = $(this).closest('li');
                    deleteComment(commentId, $reply);
                });
                $commentsList.find('.fa-ellipsis').click(function () {
                    $(this).siblings('.comment-options').toggle();
                });
                $commentsList.find('.delete-comment-btn').click(function () {
                    var commentId = $(this).closest('li').find('span[hidden]').text();
                    var $comment = $(this).closest('li');
                    DeleteComment(commentId, $comment);
                });


                $commentsList.find('.more-options').click(function (e) {
                    e.preventDefault();
                    $(this).siblings('.edit-delete-options').toggle();
                });

                /*$('#commentreplay').click(function () {
                    commentreplay();
                })*/
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function commentreplay() {
    console.log("comment");
}







function replieComment(commentId, postId) {
    /* var userId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");

    var modal = document.getElementById("replyModal");
    var replyText = document.getElementById("replyText");
    var submitReply = document.getElementById("submitReply");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        $('#replyText').focus();
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            $('#replyText').focus();
            modal.style.display = "none";
        }
    }
    submitReply.onclick = function () {
        var replyTextValue = replyText.value.trim();
        if (replyTextValue !== '') {
            addCommentReply(replyTextValue, postId, commentId, userId);
            modal.style.display = "none";
            replyText.value = "";
        }
    }
}



//add reply comment to db
function addCommentReply(replyText, postId, parentCommentId, userId) {
    var username = sessionStorage.getItem('Username');
    var ProfilePhoto = sessionStorage.getItem('ProfilePhoto');
    $.ajax({
        url: '/api/WebApi/AddComment',
        method: 'POST',
        data: {
            postId: postId,
            userId: userId,
            commentText: replyText,
            parentCommentId: parentCommentId,
            ProfilePhoto: ProfilePhoto

        },
        success: function (data) {
            $.ajax({
                url: '/api/WebApi/GetLastComment',
                type: 'GET',
                success: function (data) {
                    data.forEach(function (comment) {
                        var $parentComment = $(`li span[hidden]:contains(${parentCommentId})`).closest('li');
                        var $replyList = $parentComment.find('.reply-list');
                        var replyHTML = `
                        <li class="reply-item">
                            <div class="comet-avatar">
                                <img src="${comment.ProfilePhoto}" alt="" height="45" width="45" id="ProfilePhoto">
                            </div>
                            <div class="we-comment">
                                <div class="coment-head">
                                     <h5>${comment.FirstName} ${comment.LastName}</h5>
                                    <span>${comment.CommentDate}</span>
                                    <i hidden>${comment.CommentId}</i>
                                    ${comment.UserId == userId ? '<i class="fa-solid fa-ellipsis"></i>' : ''}
                                    <div class="comment-options" style="display: none;">
                                        <button class="btn btn-danger delete-reply-btn">Delete</button>
                                    </div>
                                </div>
                                <p>${comment.CommentText}</p>
                            </div>
                        </li> `;
                        $replyList.append(replyHTML);
                        $replyList.find('.delete-reply-btn').click(function () {
                            var commentId = $(this).closest('li').find('i[hidden]').text();
                            var $reply = $(this).closest('li');
                            DeleteComment(commentId, $reply);
                        });
                        $replyList.find('.fa-ellipsis').click(function () {
                            $(this).siblings('.comment-options').toggle();
                        });
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        error: function (error) {
            console.log('Error adding new reply:', error);
        }
    });
}






/*function UploadComment() {
    var $form = $(this).closest('.post-comt-box');
    var postId = $form.closest('.central-meta').find('.like-button').data('post-id');
    var commentText = $form.find('textarea').val();
    *//*var userId = sessionStorage.getItem('userId');*//*
var currentUserId = sessionStorage.getItem('userId');
var ProfilePhoto = sessionStorage.getItem('ProfilePhoto');


var username = sessionStorage.getItem('Username');
if (commentText.trim() !== '') {
    $.ajax({
        url: '/api/WebApi/AddComment',
        method: 'POST',
        data: { postId: postId, userId: currentUserId, commentText: commentText },
        success: function (data) {
            $form.find('textarea').val('');
            var commentHTML = '<li>' +
                '<div class="comet-avatar">' +
                '<img src="/images/download.jpg" alt="" height="45" width="45">' +
                *//* '<img src="' + comment.ProfilePhoto + '" alt="" height="40" width="40" id="ProfilePhoto">' +*//*

*//* '<img src="' + ProfilePhoto + '" alt="" height="40" width="40" id="ProfilePhoto">' +*//*
'</div>' +
'<div class="we-comment">' +
'<div class="coment-head">' +
'<h5>' + username + '</h5>' +
'<span>just now</span>' +
'</div>' +
'<p>' + commentText + '</p>' +
'</div>' +
'</li>';

$form.closest('.comment-area').find('.we-comet').prepend(commentHTML);
},
error: function (error) {
console.log(error);
}
});
}
}*/



//upload comment
function UploadComment() {
    var $form = $(this).closest('.post-comt-box');
    var postId = $form.closest('.central-meta').find('.like-button').data('post-id');
    var commentText = $form.find('textarea').val();
    /* var userId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");

    var username = sessionStorage.getItem('Username');
    var ProfilePhoto = sessionStorage.getItem('ProfilePhoto');

    if (commentText.trim() !== '') {
        $.ajax({
            url: '/api/WebApi/AddComment',
            method: 'POST',
            data: { postId: postId, userId: userId, commentText: commentText, ProfilePhoto: ProfilePhoto },
            success: function () {
                $.ajax({
                    url: '/api/WebApi/GetLastComment',
                    type: 'GET',
                    success: function (comment) {
                        if (comment) {
                            $form.find('textarea').val('');
                            var commentHTML = `<li>
                                <div class="comet-avatar">
                                    <img src="${comment.ProfilePhoto}" alt="" height="45" width="45" id="ProfilePhoto">
                                </div>
                                <div class="we-comment">
                                    <div class="coment-head">
                                        <h5>${comment.FirstName} ${comment.LastName}</h5>
                                        <span>Just Now</span>
                                        ${comment.UserId == userId ? '<i class="fa-solid fa-ellipsis"></i>' : ''}
                                        <div class="comment-options" style="display: none;">
                                            <button class="btn btn-danger delete-comment-btn" Onclick=deleteComment(${comment.CommentId});>Delete Commnet </button>
                                        </div>


                                    </div>
                                    <p>${comment.CommentText}</p>
                                </div>
                            </li>`;
                            $form.closest('.comment-area').find('.we-comet').prepend(commentHTML);

                            $(document).on('click', '.fa-ellipsis', function () {
                                $(this).siblings('.comment-options').toggle();
                            });

                            $(document).on('click', '.delete-comment-btn', function () {
                                var commentId = $(this).closest('li').find('span[hidden]').text();
                                var $comment = $(this).closest('li');
                                DeleteComment(commentId, $comment);
                            });
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}





function deleteComment(commentId) {
    if (confirm('Are you sure you want to delete this comment?')) {
        var userId = sessionStorage.getItem('userId');

        $.ajax({
            url: '/api/WebApi/DeleteComment/' + commentId,
            type: 'DELETE',
            headers: {
                'Authorization': userId
            },
            success: function (response) {
                console.log('Comment deleted successfully');

            },
            error: function (xhr, status, error) {
                console.error('Error deleting comment:', error);
            }
        });
    }
}









/*function displayNotifications() {
    $.ajax({
        url: '/api/WebApi/notifications',
        method: 'GET',
        success: function (data) {
            console.log("got notification data:", data);
            var notificationsHtml = '';
            data.forEach(function (notification) {
                notificationsHtml += `
                        <div class="notification-box">
                            <div class="notifi-meta">
                                <p>${notification.NotificationText}</p>
                                <span>${new Date(notification.NotificationTimestamp).toLocaleString()}</span>
                            </div>
                        </div>`;
            });
            //$('#notificationContent').html(notificationsHtml);
            //$('#notificationSidebar').css('right', '0'); // Show the sidebar


            $('#notification-menu').html(notificationsHtml);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching notifications:", error);
        }
    });
}*/


function displayNotifications() {
    /* var userId = sessionStorage.getItem('userId'); */
    var userId = getCookie("userId");


    $.ajax({
        url: '/api/WebApi/notifications/' + userId,
        method: 'GET',
        success: function (data) {
            console.log("got notification data:", data);
            var notificationsHtml = '';
            data.forEach(function (notification) {
                notificationsHtml += `
                    <div class="notification-box">
                        <div class="notifi-meta">
                            <img src="${notification.ProfilePhoto}" alt="" width="52" height="52" style="float: left; border-radius: 50%;">
                            ${notification.PostPhoto ?
                        `<img src="${notification.PostPhoto}" alt="" width="52" height="52" style="float: right; border-radius: 50%;">` :
                        `<p style="float: right; border-radius: 50%; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; background: #f0f0f0;">${notification.PostContent}</p>`}
                            <p>${notification.NotificationText}</p>
                            <span>${new Date(notification.NotificationTimestamp).toLocaleString()}</span>
                            <input type="hidden" class="post-id" value="${notification.PostId}">
                        </div>
                    </div>`;
            });

            $('#notification-menu').html(notificationsHtml);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching notifications:", error);
        }
    });
}


$(document).ready(function () {
    // Click event for notification link
    $('#notificationLink').click(function (event) {
        event.preventDefault();
        displayNotifications();
    });
});

$("#submitButton").click(function () {
    var postContent = $("#postContent").val().trim();
    if (postContent === "") {
        $("#postContent").addClass("invalid");
        return false; // Prevent form submission
    }
});


$(document).ready(function () {

    $('#notificationLink').click(function (event) {
        event.preventDefault();

        // Toggle slide effect to show/hide notification container
        $('#notificationContainer').slideToggle('fast');
    });
});



$(document).ready(function () {
    $('#notificationLink').on('click', function (e) {
        e.preventDefault();
        displayNotifications();
    });

    $('#bookmarkLink').on('click', function (e) {
        e.preventDefault();
        displayNotifications();
    });

    $('#homeLink').on('click', function (e) {
        e.preventDefault();
        $('.central-meta').hide();
    });

    $('#notificationLink').on('click', function (e) {
        e.preventDefault();
        $('notificationLink').hide();
    });

    $('#notificationLink').on('click', function (e) {
        e.preventDefault();

        $('.notifications').toggle();
    });
});





/*
function getUserById(userId) {
    $.ajax({
        url: '/api/WebApi/GetUserById',
        method: 'GET',
        data: { id: userId }, // Pass the userId as a query parameter
        success: function (userData) {
            console.log("User data:", userData);
            // Handle the user data as needed
        },
        error: function (xhr, status, error) {
            console.error("Error fetching user data:", error);
        }
    });
}*/








function populateUserData() {
    /* var userId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");

    $.ajax({
        url: '/api/WebApi/' + userId,
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var userData = response;
            sessionStorage.setItem('Username', response.FirstName + " " + response.LastName);
            /*$('#UserName').html(userData.LastName);*/
            $('#UserName').html(userData.FirstName + " " + userData.LastName);

            $('#City').html('<i class="fa-solid fa-city"></i> ' + userData.City);
            $('#PhoneNumber').html('<i class="fa-solid fa-phone"></i> ' + userData.PhoneNumber);
            $('#Email').html('<i class="fa-solid fa-envelope"></i> ' + userData.Email);
            $('#interestdata').append('<li>' + userData.Interests + ' </li>');
            $('#BioInfo').append('<li>' + userData.Bio + ' </li>');

            /* $('#BioInfo').append('<li>' + userData.Bio + ' </li>');*/


            /*  $('#ProfilePhoto').attr("src", userData.ProfilePhoto);*/

            var profilePhoto = userData.ProfilePhoto ? userData.ProfilePhoto : '~/images/profile.png';
            $('#ProfilePhoto').attr("src", profilePhoto);



            $('#TxtUserId').val(userData.UserId);
            $('#TxtLastName').val(userData.LastName);
            $('#TxtFirstName').val(userData.FirstName);
            $('#TxtCity').val(userData.City);
            $('#TxtEmail').val(userData.Email);
            $('#TxtBio').val(userData.bio);
            $('#TxtPhoneNumber').val(userData.PhoneNumber);
            $('#TxtBio').val(userData.Bio);
            $('#TxtUserPassword').val(userData.UserPassword);
            $('#gender').val(userData.Gender);
            $('#Interests').val(userData.Interests);
            //show Gender db value
            if (userData.Gender === 'Male') {
                $('#inlineRadio1').prop('checked', true);
            } else if (userData.Gender === 'Female') {
                $('#inlineRadio2').prop('checked', true);
            }
            //show interests db value
            var interests = userData.Interests.split(', ');
            $("input[name='Interests']").prop('checked', false);
            interests.forEach(function (interest) {
                $("input[name='Interests'][value='" + interest + "']").prop('checked', true);
            });
            //show brithdate db value
            var birthDate = new Date(userData.BirthDate);
            var year = birthDate.getFullYear();
            var month = String(birthDate.getMonth() + 1).padStart(2, '0');
            var day = String(birthDate.getDate()).padStart(2, '0');
            var formattedBirthDate = `${year}-${month}-${day}`;
            $('#BirthDate').val(formattedBirthDate);
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch user data", error);
        }
    });
}








/*function updateUserInfo() {

    const Interests = [];
    const checkboxes = $("input[name='Interests']:checked");

    checkboxes.each(function () {
        Interests.push($(this).val());
    });

    var userData = {
        UserId: $('#TxtUserId').val(),
        LastName: $('#TxtLastName').val(),
        FirstName: $('#TxtFirstName').val(),
        City: $('#TxtCity').val(),
        Email: $('#TxtEmail').val(),
        PhoneNumber: $('#TxtPhoneNumber').val(),
        Bio: $('#TxtBio').val(),
        UserPassword: $('#TxtUserPassword').val(),
        Gender: $("input[name='gender']:checked").val(),
        Interests: $("input[name='Interests']:checked").val(),
        Interests: Interests.join(', '),
        BirthDate: $('#BirthDate').val()
    };

    var userId = userData.UserId;

    $.ajax({
        url: '/api/WebApi/' + userId,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function (response) {
            console.log('User information updated successfully');
        },
        error: function (xhr, status, error) {
            console.error('Error updating user information:', error);
        }
    });
}*/

function updateUserInfo() {
    const Interests = [];
    const checkboxes = $("input[name='Interests']:checked");

    checkboxes.each(function () {
        Interests.push($(this).val());
    });

    var userData = {
        UserId: $('#TxtUserId').val(),
        LastName: $('#TxtLastName').val(),
        FirstName: $('#TxtFirstName').val(),
        City: $('#TxtCity').val(),
        Email: $('#TxtEmail').val(),
        PhoneNumber: $('#TxtPhoneNumber').val(),
        Bio: $('#TxtBio').val(),
        UserPassword: $('#TxtUserPassword').val(),
        Gender: $("input[name='gender']:checked").val(),
        Interests: Interests.join(', '),
        BirthDate: $('#BirthDate').val()
    };

    var userId = userData.UserId;
    var email = userData.Email;

    // Check if the email is already in use
    $.ajax({
        url: '/api/WebApi/check-email',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ UserId: userId, Email: email }),
        success: function (response) {
            if (response.emailInUse) {
                $('#emailError').text('Email already entered.').show();
            } else {
                $.ajax({
                    url: '/api/WebApi/' + userId,
                    method: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(userData),
                    success: function (response) {
                        console.log('User information updated successfully');
                        $('#emailError').hide();

                        window.location.href = '/Login/HomePage';
                    },
                    error: function (xhr, status, error) {
                        console.error('Error updating user information:', error);
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error checking email:', error);
        }
    });
}




function changePassword() {
    var newPassword = document.getElementById('input').value;
    var currentPassword = document.getElementById('currentPassword').value;

    $.ajax({
        url: '/api/changePassword',
        method: 'POST',
        data: {
            newPassword: newPassword,
            currentPassword: currentPassword
        },
        success: function (response) {
            console.log('Password changed successfully');
        },
        error: function (xhr, status, error) {
            console.error('Error changing password:', error);
        }
    });
}


/*function initializePage() {
    $("#uploadForm").validate({
        rules: {
            postContent: {
                required: true
            }
        },
        messages: {
            postContent: {
                required: "Post content is required."
            }
        },
        submitHandler: function (form) {
            UploadPost();
        }
    });
}

document.addEventListener('DOMContentLoaded', initializePage);*/




function UploadPost() {
    const fileInput = document.getElementById('userpost');
    const file = fileInput.files[0];
    var userId = getCookie("userId");

    /*    var currentUserId = sessionStorage.getItem('userId');
     *
    */    /* const postContent = $('#postContent').val();*/



    /*if (!postContent) {
        alert('Post content is required.');
        return;
    }*/

    const postContent = document.getElementById('postContent').value.trim();
    const postContentError = document.getElementById('postContentError');

    if (!postContent) {
        postContentError.style.display = 'block';
        return;
    } else {
        postContentError.style.display = 'none';
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('PostContent', postContent);
    if (file) {
        formData.append('file', file);
    }

    $.ajax({
        url: '/api/WebApi/AddNewPost',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log("Post Added", data);
            $("#userpost").val("");
            $("#postContent").val("");

            $.ajax({
                url: '/api/WebApi/GetLastPost',
                type: 'GET',
                success: function (data) {
                    data.forEach(function (post) {
                        $('#page-contents .loadMore').prepend(AddPost(post));
                    });

                    $('.like-button').click(function () {
                        var $this = $(this);
                        var postId = $this.data('post-id');
                        /* var user = sessionStorage.getItem('userId');*/
                        var user = getCookie("userId");
                        $.ajax({
                            url: '/api/WebApi/LikePost',
                            method: 'POST',
                            data: { postId: postId, userId: user },
                            success: function (data) {
                                $this.find('ins').text(data.likeCount);
                                if (data.isLiked) {
                                    $this.find('i').removeClass('fa-regular fa-heart').addClass('fa-solid fa-heart liked');
                                } else {
                                    $this.find('i').removeClass('fa-solid fa-heart liked').addClass('fa-regular fa-heart');
                                }

                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });
                    });
                    $('.post-comt-box button').click(UploadComment);
                },
                error: function (xhr, status, error) {
                    console.error("Post Not added", error);
                }
            })
        },
        error: function (xhr, status, error) {
            console.error("Post Not added", error);
        }
    });
}



/*function attachLikeButtonHandlers() {
    $('.like-button').off('click').on('click', function () {
        var $this = $(this);
        var postId = $this.data('post-id');
        var currentUserId = sessionStorage.getItem('userId');
        var emojiDropdown = $('<div class="emoji-dropdown"></div>');
        var emojis = ['😀', '😍', '😂', '😎', '😘', '😅', '💔', '💯'];

        $this.find('#like').remove();

        emojis.forEach(function (emoji, index) {
            var emojiElement = $('<span class="emoji-item" data-emoji-id="' + (index + 1) + '">' + emoji + '</span>');
            emojiElement.click(function () {
                var emojiId = index + 1;
                $.ajax({
                    url: '/api/WebApi/LikePost',
                    method: 'POST',
                    data: JSON.stringify({ postId: postId, userId: currentUserId, likeType: emojiId }),
                    contentType: 'application/json',
                    success: function (data) {
                        *//* $this.find('ins').text(data.likeCount);
 if (data.isLiked) {
     $this.find('i').removeClass('fa-regular fa-heart').addClass('fa-solid fa-heart');
 } else {
     $this.find('i').removeClass('fa-solid fa-heart').addClass('fa-regular fa-heart');
 }
 console.log(emojiId);*//*
var newLikeButton = $('<span class="views like-button" data-toggle="tooltip" title="like" data-post-id="' + postId + '">' + emoji + '<ins>' + data.likeCount + '</ins></span>');
$this.html(newLikeButton);
emojiDropdown.remove();
},
error: function (error) {
console.log(error);
}
});
});
emojiDropdown.append(emojiElement);
});

$this.append(emojiDropdown);
});
$('.post-comt-box button').click(UploadComment);
$('.post-comt-box button').click(loadPostComments);
}

function attachCommentButtonHandlers() {
$('.post-comt-box button').off('click').on('click', function () {
*//* UploadComment();
 loadPostComments();*//*
$('.post-comt-box button').click(UploadComment);
$('.post-comt-box button').click(loadPostComments);
});
}

function renderLikes(likeTypes, likeCount) {
if (!Array.isArray(likeTypes)) {
console.error('likeTypes is not an array', likeTypes);
return '';
}

var emojis = ['😀', '😍', '😂', '😎', '😘', '😅', '💔', '💯'];
var emojiCounts = {};

likeTypes.forEach(function (likeType) {
emojiCounts[likeType] = emojiCounts[likeType] ? emojiCounts[likeType] + 1 : 1;
});

var emojisHTML = '';
for (var emojiId in emojiCounts) {
if (emojiCounts.hasOwnProperty(emojiId)) {
   var emojiCount = emojiCounts[emojiId];
   if (emojiCount > 0) {
       var emoji = emojis[emojiId - 1];
       emojisHTML += `<span class="emoji">${emoji} <span class="emoji-count">${emojiCount}</span></span>`;
   }
}
}
return emojisHTML;
}
*/








//AllPostshow Aboutpage
/*function AddPosts(post) {
    var postHTML = '<li class="post-item" data-post-id="' + post.postId + '">' +
        //'<img src="' + post.PostPhoto + '" alt="' + post.postContent + '" height="212" width="212">' +
        '<img src="' + post.PostPhoto + '" height="212" width="212">'+
        '<span class="post-icon"><i class="fa-regular fa-bookmark"></i></span>' +
        '</li>';
    var postElement = $(postHTML);
    postElement.find('.post-icon').click(function () {
        handlearchievepost($(this).closest('.post-item').data('post-id'));
    });
    return postElement;
}*/


function AddPosts(post) {
    var postHTML = '<li class="post-item" data-post-id="' + post.PostId + '">';

    if (post.PostPhoto) {
        postHTML += '<img src="' + post.PostPhoto + '" alt="Post photo" height="212" width="212">';
    } else if (post.PostContent) {
        postHTML += '<p>' + post.PostContent + '</p>';
    }

    postHTML += '<span class="post-icon"><i class="fa-regular fa-bookmark"></i></span>';
    postHTML += '</li>';

    var postElement = $(postHTML);
    postElement.find('.post-icon').click(function () {
        handlearchievepost($(this).closest('.post-item').data('post-id'));
    });

    return postElement;
}







/*function loadUserPostsHomePage() {
    var userId = sessionStorage.getItem('userId');
    $.ajax({
        url: '/api/WebApi/UserPosts1/' + userId,
        method: 'GET',
        success: function (data) {
           
            data.reverse().forEach(function (post) {
                if (post.Status === 1 || post.Status === 2 || post.UserId !== parseInt(userId)) {
                    return;
                } else {
                    var postElement = AddPosts(post);
                    $('#UserPostDiv ul.photos').append(postElement);
                }
            });

        },
        error: function (error) {
            console.log(error);
        }
    });

}*/

/*function loadUserPostsHomePage() {
    var userId = sessionStorage.getItem('userId');
    $.ajax({
        url: '/api/WebApi/UserPosts1/' + userId,
        method: 'GET',
        success: function (data) {
            data.reverse().forEach(function (post) {
                $('#UserPostDiv ul.photos').empty();
                // Skip posts with Status 1 or 2, or if the post doesn't belong to the user
                if (post.Status === 1 || post.Status === 2 || post.UserId !== parseInt(userId)) {
                    return;
                }

                if (post.PostContent || post.PostPhoto) {
                    var postElement = AddPosts(post);
                    $('#UserPostDiv ul.photos').append(postElement);
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}
*/

function loadUserPostsHomePage() {
    /*  var userId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");
    $.ajax({
        url: '/api/WebApi/UserPosts1/' + userId,
        method: 'GET',
        success: function (data) {
            $('#UserPostDiv ul.photos').empty();
            data.reverse().forEach(function (post) {
                if (post.Status === 1 || post.Status === 2 || post.UserId !== parseInt(userId)) {
                    return;
                } else {
                    var postElement = AddPosts(post);
                    $('#UserPostDiv ul.photos').append(postElement);
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}



//archievepost
/*function archievepost(post) {
    var postHTML = '<li class="post-item" data-post-id="' + post.PostId + '">' +
        '<img src="' + post.PostPhoto + '" alt="' + post.postContent + '" height="212" width="212">' +
        '<span class="post-icon"><i class="fa-solid fa-bookmark"></i></span>' +
        '</li>';
    var postElement = $(postHTML);
    postElement.find('.post-icon').click(function () {
        handlearchievepost($(this).closest('.post-item').data('post-id'));
    });
    return postElement;
}*/

function archievepost(post) {
    var postHTML = '<li class="post-item" data-post-id="' + post.PostId + '">';

    if (post.PostPhoto) {
        postHTML += '<img src="' + post.PostPhoto + '" alt="Post photo" height="212" width="212">';
    } else if (post.PostContent) {
        postHTML += '<p>' + post.PostContent + '</p>';
    }

    postHTML += '<span class="post-icon"><i class="fa-solid fa-bookmark"></span>';
    postHTML += '</li>';

    var postElement = $(postHTML);
    postElement.find('.post-icon').click(function () {
        handlearchievepost($(this).closest('.post-item').data('post-id'));
    });

    return postElement;
}





function loadarchievepost() {
    /* var userId = sessionStorage.getItem('userId');*/
    var userId = getCookie("userId");
    $.ajax({
        url: '/api/WebApi/UserPosts1/' + userId,
        method: 'GET',
        success: function (data) {
            $('#archieveDiv ul.photos').empty();
            data.reverse().forEach(function (post) {
                if (post.UserId == userId) {
                    if (post.Status == "2") {
                        var postElement = archievepost(post);
                        $('#archieveDiv ul.photos').append(postElement);
                    }
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}



function handlearchievepost(postId) {
    console.log("Post ID:", postId);
    $('#archieveDiv ul.photos').empty();
    var postElement = $('[data-post-id="' + postId + '"]');
    var apiUrl;
    var successMessage;
    if (postElement.closest('#UserPostDiv').length > 0) {
        apiUrl = '/api/WebApi/addarchievepost/' + postId;
        successMessage = "removearchievepost";
    } else if (postElement.closest('#archieveDiv').length > 0) {
        apiUrl = '/api/WebApi/removearchievepost/' + postId;
        successMessage = "archievepost";
    } else {
        console.log("Post element not found in either container");
        return;
    }
    $.ajax({
        url: apiUrl,
        method: 'PUT',
        success: function (data) {
            console.log(successMessage);
            postElement.hide();
        },
        error: function (error) {
            console.log(error);
        }
    });
}




