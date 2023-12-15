import styles from "./components.module.css";

const CreateUserForm = ( { createUser } ) => {
    return (
        <div>
            <h2>Create User Form</h2>
            <form className={styles.Form} onSubmit={(e) => createUser(e)}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name"/>

                <label htmlFor="email">Email</label>
                <input type="email" name="email"/>

                <label htmlFor="newPass">Password</label>
                <input type="password" name="password"/>

                <button type="submit">Create User</button>
            </form>
        </div>
    )
}
export default CreateUserForm;