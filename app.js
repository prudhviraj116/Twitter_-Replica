document.addEventListener('DOMContentLoaded', () => {
    // Check if logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'xtwitter.html';
        return;
    }

    const page = document.body.dataset.page;
    if (page) {
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
    }

    const tweetForm = document.getElementById('tweet-form');
    const tweetText = document.getElementById('tweet-text');
    const tweetImageInput = document.getElementById('tweet-image');
    const tweetImagePreview = document.getElementById('tweet-image-preview');

    if (tweetImageInput && tweetImagePreview) {
        tweetImageInput.addEventListener('change', () => {
            const file = tweetImageInput.files[0];
            if (!file) {
                tweetImagePreview.style.display = 'none';
                tweetImagePreview.innerHTML = '';
                return;
            }

            const url = URL.createObjectURL(file);
            tweetImagePreview.style.display = 'block';
            tweetImagePreview.innerHTML = `<img src="${url}" alt="Tweet image preview" style="max-width:100%; border-radius:16px;" />`;
        });
    }

    if (tweetForm) {
        tweetForm.addEventListener('submit', event => {
            event.preventDefault();
            if (!tweetText) {
                return;
            }
            const text = tweetText.value.trim();
            if (!text) {
                return;
            }

            const feed = document.getElementById('feed');
            if (!feed) {
                return;
            }

            const imageFile = tweetImageInput ? tweetImageInput.files[0] : null;
            let imageMarkup = '';
            if (imageFile) {
                const imageUrl = URL.createObjectURL(imageFile);
                imageMarkup = `<img src="${imageUrl}" alt="Tweet image" style="width:100%; margin-top:14px; border-radius:16px;" />`;
            }

            const tweetCard = document.createElement('article');
            tweetCard.className = 'tweet-card';
            tweetCard.innerHTML = `
                <div class="tweet-header">
                    <div class="tweet-avatar"></div>
                    <div>
                        <strong>You</strong>
                        <div class="tweet-meta">@you · just now</div>
                    </div>
                </div>
                <div class="tweet-content">
                    <p>${text}</p>
                    ${imageMarkup}
                </div>
            `;

            feed.prepend(tweetCard);
            tweetText.value = '';
            if (tweetImageInput) {
                tweetImageInput.value = null;
            }
            if (tweetImagePreview) {
                tweetImagePreview.style.display = 'none';
                tweetImagePreview.innerHTML = '';
            }
        });
    }

    const editProfileBtn = document.getElementById('edit-profile-btn');
    const profileModal = document.getElementById('profile-edit-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    const profileNameInput = document.getElementById('profile-name-input');
    const profileHandleInput = document.getElementById('profile-handle-input');
    const profileBioInput = document.getElementById('profile-bio-input');
    const profileInterestsInput = document.getElementById('profile-interests-input');
    const profileAvatarInput = document.getElementById('profile-avatar-input');
    const profileCoverInput = document.getElementById('profile-cover-input');
    const profileAvatarPreview = document.getElementById('profile-avatar-preview');
    const profileCoverPreview = document.getElementById('profile-cover-preview');
    const profileName = document.getElementById('profile-name');
    const profileHandle = document.getElementById('profile-handle');
    const profileBio = document.getElementById('profile-bio');
    const profileInterests = document.getElementById('profile-interests');
    const interestCount = document.getElementById('interest-count');
    const profileBanner = document.getElementById('profile-banner');
    const profileAvatar = document.getElementById('profile-avatar');

    if (editProfileBtn && profileModal) {
        editProfileBtn.addEventListener('click', () => {
            profileModal.classList.add('active');
        });
    }

    if (closeProfileModal && profileModal) {
        closeProfileModal.addEventListener('click', () => {
            profileModal.classList.remove('active');
        });
    }

    if (profileAvatarInput && profileAvatarPreview && profileAvatar) {
        profileAvatarInput.addEventListener('change', () => {
            const file = profileAvatarInput.files[0];
            if (!file) {
                return;
            }
            const url = URL.createObjectURL(file);
            profileAvatarPreview.src = url;
            profileAvatar.style.backgroundImage = `url(${url})`;
            profileAvatar.style.backgroundSize = 'cover';
            profileAvatar.style.backgroundPosition = 'center';
        });
    }

    if (profileCoverInput && profileCoverPreview && profileBanner) {
        profileCoverInput.addEventListener('change', () => {
            const file = profileCoverInput.files[0];
            if (!file) {
                return;
            }
            const url = URL.createObjectURL(file);
            profileCoverPreview.src = url;
            profileBanner.style.backgroundImage = `url(${url})`;
            profileBanner.style.backgroundSize = 'cover';
            profileBanner.style.backgroundPosition = 'center';
        });
    }

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', () => {
            if (profileName && profileNameInput) {
                profileName.textContent = profileNameInput.value.trim() || 'John Doe';
            }
            if (profileHandle && profileHandleInput) {
                profileHandle.textContent = profileHandleInput.value.trim() || '@johndoe';
            }
            if (profileBio && profileBioInput) {
                profileBio.textContent = profileBioInput.value.trim() || 'Designer, creator and community builder sharing product updates and daily inspiration.';
            }
            if (profileInterests && profileInterestsInput && interestCount) {
                const interests = profileInterestsInput.value.split(',').map(i => i.trim()).filter(Boolean);
                profileInterests.innerHTML = interests.map(interest => `<span class="profile-chip">${interest}</span>`).join('');
                interestCount.textContent = interests.length;
            }
            if (profileModal) {
                profileModal.classList.remove('active');
            }
        });
    }

    if (cancelProfileBtn) {
        cancelProfileBtn.addEventListener('click', () => {
            profileModal.classList.remove('active');
        });
    }

    const peopleSearch = document.getElementById('people-search');
    if (peopleSearch) {
        peopleSearch.addEventListener('input', () => {
            const filter = peopleSearch.value.toLowerCase();
            document.querySelectorAll('.search-item').forEach(item => {
                const text = item.innerText.toLowerCase();
                item.style.display = text.includes(filter) ? 'grid' : 'none';
            });
        });
    }

    document.querySelectorAll('.accept-request').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.request-item');
            if (item) {
                item.innerHTML = `<div><strong>Request accepted</strong><p>You now follow this account.</p></div>`;
            }
        });
    });

    document.querySelectorAll('.reject').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.request-item');
            if (item) {
                item.remove();
            }
        });
    });

    // Add logout button
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) {
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = '<a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>';
        sidebarNav.appendChild(logoutLi);
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'xtwitter.html';
        });
    }
});
