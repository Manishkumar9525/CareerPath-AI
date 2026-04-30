import { useEffect, useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
} from "../services/profileService";

const Profile = () => {
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({});
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);

  // ✅ FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.user);
        setStats(res.data.stats);
        setForm(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SAVE PROFILE
  const handleSave = async () => {
    const confirmSave = window.confirm("Save changes?");
    if (!confirmSave) return;

    try {
      const res = await updateProfile(form);
      setUser(res.data.user);
      setEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ IMAGE UPLOAD
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProfileImage(formData);
      setUser(res.data.user);
      setPreview(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE IMAGE
  const handleDeleteImage = async () => {
    const confirmDelete = window.confirm("Delete profile image?");
    if (!confirmDelete) return;

    try {
      await deleteProfileImage();
      setUser({ ...user, avatar: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto mt-4 md:mt-10">

        {/* PROFILE CARD */}
        <div className="relative rounded-3xl bg-glass border border-main p-5 sm:p-6 md:p-8 mb-10">

          {/* AVATAR */}
          <div className="md:absolute md:-top-10 md:left-8 group">

            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-background flex items-center justify-center text-xl md:text-2xl font-semibold shadow-lg">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : user.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover" />
              ) : (
                user.name?.charAt(0) || "U"
              )}
            </div>

            {/* HOVER ACTIONS */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-black/50 rounded-full transition">
              <label className="cursor-pointer text-white text-xs">
                ✏️
                <input type="file" hidden onChange={handleImageChange} />
              </label>

              {user.avatar && (
                <button
                  onClick={handleDeleteImage}
                  className="text-white text-xs"
                >
                  🗑
                </button>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-4 md:mt-12 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

            <div className="min-w-0">

              {edit ? (
                <input
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                  className="w-full text-2xl md:text-3xl bg-transparent border-b border-main outline-none"
                />
              ) : (
                <h1 className="text-2xl md:text-3xl font-display text-main break-words">
                  {user.name}
                </h1>
              )}

              <div className="flex flex-wrap gap-4 mt-2 text-sub text-sm">

                <span>📧 {user.email}</span>

                {edit ? (
                  <>
                    <input
                      name="location"
                      value={form.location || ""}
                      onChange={handleChange}
                      placeholder="Location"
                      className="bg-transparent border-b border-main outline-none w-full sm:w-auto"
                    />
                    <input
                      name="career"
                      value={form.career || ""}
                      onChange={handleChange}
                      placeholder="Career"
                      className="bg-transparent border-b border-main outline-none w-full sm:w-auto"
                    />
                  </>
                ) : (
                  <>
                    <span>📍 {user.location || "Add location"}</span>
                    <span>💼 {user.career || "Add career"}</span>
                  </>
                )}
              </div>

            </div>

            {/* BUTTON */}
            {edit ? (
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-full border border-main text-main hover:bg-glass transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEdit(true)}
                className="px-5 py-2 rounded-full border border-main text-main hover:bg-glass transition"
              >
                Edit profile
              </button>
            )}
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="p-6 rounded-2xl bg-glass border border-main">
            <p className="text-sub text-sm">Roadmaps</p>
            <h2 className="text-2xl font-bold text-main mt-2">
              {stats.totalRoadmaps || 0}
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-glass border border-main">
            <p className="text-sub text-sm">Completed</p>
            <h2 className="text-2xl font-bold text-main mt-2">
              {stats.completedTasks || 0}
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-glass border border-main">
            <p className="text-sub text-sm">Streak</p>
            <h2 className="text-2xl font-bold text-main mt-2">🔥 0</h2>
          </div>

          <div className="p-6 rounded-2xl bg-glass border border-main">
            <p className="text-sub text-sm">Avg progress</p>
            <h2 className="text-2xl font-bold text-main mt-2">
              {stats.avgProgress || 0}%
            </h2>
          </div>

        </div>

        {/* ABOUT */}
        <div className="p-6 rounded-3xl bg-glass border border-main">

          <h2 className="text-lg font-semibold text-main mb-3">
            About
          </h2>

          {edit ? (
            <textarea
              name="bio"
              value={form.bio || ""}
              onChange={handleChange}
              className="w-full bg-transparent border border-main rounded-xl p-3 outline-none"
              placeholder="Write about yourself..."
              rows={4}
            />
          ) : (
            <p className="text-sub leading-relaxed">
              {user.bio || "Add something about yourself"}
            </p>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;