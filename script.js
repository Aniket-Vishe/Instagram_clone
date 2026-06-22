// Simple JavaScript for the school social media project
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  setupCommentInputs();
  setupMessageBox();
  setupExploreSearch();
  setupProfileTabs();
  setupSettingsPage();
  setupBioCounter();
  setupReelsPage();
});

function toggleLike(btn, postId) {
  const count = document.getElementById('likes_' + postId);
  const icon = btn.querySelector('i');
  const liked = btn.classList.toggle('liked');

  if (icon) {
    icon.className = liked ? 'bi bi-heart-fill' : 'bi bi-heart';
    icon.style.color = liked ? '#ed4956' : '';
  }

  if (count) {
    const current = parseInt(count.textContent, 10) || 0;
    count.textContent = liked ? current + 1 : Math.max(0, current - 1);
  }
}

function focusComment(postId) {
  const input = document.getElementById('comment_' + postId);
  if (input) input.focus();
}

function postComment(postId) {
  const input = document.getElementById('comment_' + postId);
  const list = document.getElementById('comments_' + postId);
  if (!input || !list || !input.value.trim()) return;

  const comment = document.createElement('div');
  comment.className = 'ig-comment-preview';
  comment.innerHTML = '<span class="ig-caption-user">you</span> ' + escapeHtml(input.value.trim());
  list.appendChild(comment);
  input.value = '';
}

function setupCommentInputs() {
  document.querySelectorAll('.ig-comment-input').forEach(function (input) {
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        postComment(input.id.replace('comment_', ''));
      }
    });
  });
}

function igFollow(btn) {
  const following = btn.textContent.trim() === 'Following';
  btn.textContent = following ? 'Follow' : 'Following';
  btn.classList.toggle('following', !following);
}

function sendSimpleMessage() {
  const input = document.getElementById('dmInput');
  const box = document.getElementById('dmMessages');
  if (!input || !box || !input.value.trim()) return;

  const row = document.createElement('div');
  row.className = 'ig-dm-msg ig-dm-sent';
  row.innerHTML = '<div class="ig-dm-bubble ig-dm-bubble-sent">' + escapeHtml(input.value.trim()) + '</div>';
  box.appendChild(row);
  input.value = '';
  box.scrollTop = box.scrollHeight;
}

function setupMessageBox() {
  const input = document.getElementById('dmInput');
  if (!input) return;
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') sendSimpleMessage();
  });
}

function setupExploreSearch() {
  const input = document.getElementById('exploreSearch');
  if (!input) return;

  input.addEventListener('input', function () {
    const value = input.value.trim().toLowerCase();
    document.querySelectorAll('[data-search]').forEach(function (item) {
      item.style.display = item.dataset.search.includes(value) ? '' : 'none';
    });
  });
}

function setupProfileTabs() {
  const tabs = document.querySelectorAll('.ig-profile-tab[data-target]');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (item) {
        item.classList.remove('active');
      });
      tab.classList.add('active');

      document.querySelectorAll('.profile-panel').forEach(function (panel) {
        panel.style.display = 'none';
      });

      const target = document.getElementById(tab.dataset.target);
      if (target) target.style.display = target.classList.contains('ig-grid') ? 'grid' : 'block';
    });
  });
}

function setupSettingsPage() {
  const navItems = document.querySelectorAll('.settings-link[data-target]');
  if (!navItems.length) return;

  navItems.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      navItems.forEach(function (item) {
        item.classList.remove('active');
      });
      link.classList.add('active');

      document.querySelectorAll('.settings-panel').forEach(function (panel) {
        panel.style.display = 'none';
      });

      const target = document.getElementById(link.dataset.target);
      if (target) target.style.display = 'block';
    });
  });

  const profileForm = document.getElementById('settingsProfileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function (event) {
      event.preventDefault();
      showToast('Profile saved.');
    });
  }

  const passwordForm = document.getElementById('settingsPasswordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const newPass = document.getElementById('newPass');
      const confirmPass = document.getElementById('confirmPass');
      if (!newPass.value || newPass.value !== confirmPass.value) {
        showToast('Passwords do not match.');
        return;
      }
      showToast('Password changed.');
      passwordForm.reset();
    });
  }
}

function setupBioCounter() {
  const bio = document.getElementById('bioArea');
  const count = document.getElementById('bioCount');
  if (!bio || !count) return;
  count.textContent = bio.value.length;
  bio.addEventListener('input', function () {
    count.textContent = bio.value.length;
  });
}

function setupReelsPage() {
  const feed = document.getElementById('reelsFeed');
  if (!feed) return;

  const initialReels = [
    { id: 1, user: 'chinu_photo', name: 'Sunset Heart', caption: 'Heart for the sunset.', likes: 245, comments: 18, music: 'Sunrise Vibes • Lumen', tag: 'Travel', avatar: 'chinu.jpg', image: 'heart.jpeg' },
    { id: 2, user: 'priya_art', name: 'Studio vibes', caption: 'Soft edits and creative color blocks.', likes: 188, comments: 12, music: 'Night Bloom • Nova', tag: 'Art', avatar: 'https://i.pravatar.cc/48?img=9', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80' },
    { id: 3, user: 'meera_clicks', name: 'Cafe routine', caption: 'Coffee, notes, and a slow afternoon.', likes: 312, comments: 26, music: 'Cafe Loop • Sora', tag: 'Food', avatar: 'https://i.pravatar.cc/48?img=3', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80' },
    { id: 4, user: 'ankit_dev', name: 'Night city', caption: 'City lights and late-evening reflections.', likes: 154, comments: 9, music: 'Midnight Drive • Pixel', tag: 'Trend', avatar: 'https://i.pravatar.cc/48?img=7', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80' }
  ];

  const moreReels = [
    { id: 5, user: 'sara_studio', name: 'Color pop', caption: 'A bright edit made for the evening feed.', likes: 432, comments: 33, music: 'Color Run • Echo', tag: 'Art', avatar: 'https://i.pravatar.cc/48?img=11', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80' },
    { id: 6, user: 'ravi_travel', name: 'Mountain path', caption: 'Fresh air, open roads, and wide views.', likes: 267, comments: 17, music: 'Trail Notes • Atlas', tag: 'Travel', avatar: 'https://i.pravatar.cc/48?img=13', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80' },
    { id: 7, user: 'naina_food', name: 'Street snack', caption: 'Spices, color, and late-night cravings.', likes: 389, comments: 24, music: 'Street Beat • Maya', tag: 'Food', avatar: 'https://i.pravatar.cc/48?img=14', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80' },
    { id: 8, user: 'zoe_vibes', name: 'Weekend glow', caption: 'A quick reel for a bright weekend mood.', likes: 298, comments: 19, music: 'Weekend Glow • Kairo', tag: 'Trend', avatar: 'https://i.pravatar.cc/48?img=15', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80' }
  ];

  const reelPool = initialReels.concat(moreReels);
  let visibleCount = 0;
  let loadingMore = false;

  function renderReel(reel) {
    return '<article class="ig-reel-card" data-id="' + reel.id + '" data-liked="false" data-following="false">' +
      '<div class="ig-reel-video" style="background-image:linear-gradient(180deg, rgba(0,0,0,.16), rgba(0,0,0,.68)), url(' + reel.image + ')" tabindex="0">' +
      '<div class="ig-reel-top-row">' +
      '<div class="ig-reel-badges">' +
      '<span class="ig-reel-badge">' + escapeHtml(reel.tag) + '</span>' +
      '<span class="ig-reel-chip">Reels</span>' +
      '</div>' +
      '<button class="ig-reel-action" data-action="mute" aria-label="Mute reel"><i class="bi bi-volume-up"></i></button>' +
      '</div>' +
      '<div class="ig-reel-progress"><span class="ig-reel-progress-fill"></span></div>' +
      '<div class="ig-reel-bottom-row">' +
      '<div class="ig-reel-caption-block">' +
      '<div class="ig-reel-user">' +
      '<img src="' + reel.avatar + '" alt="" />' +
      '<div><div class="ig-reel-user-name">@' + escapeHtml(reel.user) + '</div><div class="ig-reel-note">' + escapeHtml(reel.name) + '</div></div>' +
      '</div>' +
      '<div class="ig-reel-caption">' + escapeHtml(reel.caption) + '</div>' +
      '<div class="ig-reel-music"><i class="bi bi-music-note-beamed"></i> ' + escapeHtml(reel.music) + '</div>' +
      '</div>' +
      '<div class="ig-reel-actions">' +
      '<button class="ig-reel-action" data-action="like" aria-label="Like reel"><i class="bi bi-heart"></i> <span class="ig-reel-likes">' + reel.likes + '</span></button>' +
      '<button class="ig-reel-action" data-action="comment" aria-label="Comment on reel"><i class="bi bi-chat"></i> <span class="ig-reel-comments">' + reel.comments + '</span></button>' +
      '<button class="ig-reel-action" data-action="follow" aria-label="Follow creator">Follow</button>' +
      '</div>' +
      '</div>' +
      '<div class="ig-reel-heartburst">♥</div>' +
      '</div>' +
      '</article>';
  }

  function appendReels(count) {
    const nextItems = reelPool.slice(visibleCount, visibleCount + count);
    if (!nextItems.length) return;

    feed.insertAdjacentHTML('beforeend', nextItems.map(renderReel).join(''));
    visibleCount += nextItems.length;

    if (visibleCount === 4) {
      const firstCard = feed.querySelector('.ig-reel-card');
      if (firstCard) firstCard.classList.add('playing');
    }
  }

  function loadMoreReels() {
    if (loadingMore || visibleCount >= reelPool.length) return;
    loadingMore = true;
    setTimeout(function () {
      appendReels(4);
      loadingMore = false;
    }, 350);
  }

  appendReels(4);

  feed.addEventListener('click', function (event) {
    const actionBtn = event.target.closest('[data-action]');
    const card = event.target.closest('.ig-reel-card');

    if (actionBtn) {
      const action = actionBtn.dataset.action;
      if (action === 'like') {
        const likesEl = actionBtn.querySelector('.ig-reel-likes');
        const current = parseInt(likesEl.textContent, 10) || 0;
        const liked = card.getAttribute('data-liked') === 'true';
        card.setAttribute('data-liked', String(!liked));
        actionBtn.classList.toggle('liked', !liked);
        actionBtn.querySelector('i').className = !liked ? 'bi bi-heart-fill' : 'bi bi-heart';
        likesEl.textContent = !liked ? current + 1 : Math.max(0, current - 1);
        if (!liked) card.classList.add('liked'); else card.classList.remove('liked');
        showToast(!liked ? 'Reel liked.' : 'Reel unliked.');
        return;
      }

      if (action === 'comment') {
        showToast('Comments are ready for the next update.');
        return;
      }

      if (action === 'follow') {
        const following = card.getAttribute('data-following') === 'true';
        card.setAttribute('data-following', String(!following));
        actionBtn.classList.toggle('following', !following);
        actionBtn.textContent = !following ? 'Following' : 'Follow';
        showToast(!following ? 'Followed creator.' : 'Unfollowed creator.');
        return;
      }

      if (action === 'mute') {
        const muted = card.classList.toggle('muted');
        const icon = actionBtn.querySelector('i');
        icon.className = muted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up';
        actionBtn.setAttribute('aria-label', muted ? 'Unmute reel' : 'Mute reel');
        showToast(muted ? 'Reel muted.' : 'Reel unmuted.');
        return;
      }
    }

    if (card && !event.target.closest('button')) {
      card.classList.toggle('playing');
      showToast(card.classList.contains('playing') ? 'Reel playing.' : 'Reel paused.');
    }
  });

  feed.addEventListener('dblclick', function (event) {
    const card = event.target.closest('.ig-reel-card');
    if (!card) return;
    const likesEl = card.querySelector('.ig-reel-likes');
    const actionBtn = card.querySelector('[data-action="like"]');
    const current = parseInt(likesEl.textContent, 10) || 0;
    const liked = card.getAttribute('data-liked') === 'true';
    if (!liked) {
      card.setAttribute('data-liked', 'true');
      likesEl.textContent = current + 1;
      actionBtn.classList.add('liked');
      actionBtn.querySelector('i').className = 'bi bi-heart-fill';
      card.classList.add('liked');
      setTimeout(function () { card.classList.remove('liked'); }, 400);
      showToast('Double-tap liked.');
    }
  });

  window.addEventListener('scroll', function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 180) {
      loadMoreReels();
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('igToast');
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(function () {
    toast.style.display = 'none';
  }, 1800);
}

function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  if (btn) btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Kept as small no-op helpers so older pages do not break.
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function previewAvatar(input) {
  const image = document.getElementById('settingsAvatar');
  if (!image || !input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    image.src = event.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}

function checkPassStrength() {}
function previewCreate() {}
function sharePost() {
  showToast('Share option is only a demo.');
}
