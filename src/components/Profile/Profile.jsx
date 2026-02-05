import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onEditProfile,
  onLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar onEditProfile={onEditProfile} onLogout={onLogout} />
      </section>
      <section className="profile__clothing">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
