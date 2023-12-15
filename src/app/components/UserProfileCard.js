import styles from "./components.module.css";

const UserProfileCard = ({user}) => {
    return (
        <div className={styles.UserProfile}>
            <h2>Name: {user?.name || "Default Name"}</h2>
            <p>Email: {user?.email}</p>
        </div>
    );
};

export default UserProfileCard;