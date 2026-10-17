(() => {
  // Ubah menjadi true setelah foto profil siap digunakan.
  const SHOW_PROFILE_PHOTO = false;

  const photoWrapper = document.getElementById("profile-photo-wrapper");
  const profilePhoto = document.getElementById("profile-photo");

  if (!SHOW_PROFILE_PHOTO || !photoWrapper || !profilePhoto) {
    return;
  }

  function showPhotoIfLoaded() {
    if (profilePhoto.naturalWidth > 0) {
      photoWrapper.classList.add("visible");
    } else {
      photoWrapper.classList.remove("visible");
    }
  }

  profilePhoto.addEventListener("load", showPhotoIfLoaded);

  profilePhoto.addEventListener("error", () => {
    photoWrapper.classList.remove("visible");
  });

  // Menangani kondisi ketika gambar sudah selesai dimuat.
  if (profilePhoto.complete) {
    showPhotoIfLoaded();
  }
})();