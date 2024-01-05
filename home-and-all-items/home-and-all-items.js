// Navigate
function navigateTo(url) {
  window.location.href = url;
}
// Track followers
var isFollowed = false;
var followerCount = 0;
var followButton = document.getElementById("followButton");
var countElement = document.getElementById("count");

function toggleFollow() {
  isFollowed = !isFollowed;
  updateButtonText();
  updateFollowerCount();
}

function updateButtonText() {
  followButton.textContent = isFollowed ? "Followed" : "Follow";
  followButton.classList.toggle("followed", isFollowed);
}

function updateFollowerCount() {
  followerCount = isFollowed
    ? followerCount + 1
    : Math.max(followerCount - 1, 0);
  countElement.textContent = followerCount;
}
