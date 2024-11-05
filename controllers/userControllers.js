// controllers/userController.js

const { users, userInformation } = require("../data.js");

// Get all users
const getUsers = (req, res) => {
    return res.json(users); // Return the array of users
};

// Signup a new user
const signupUser = (req, res) => {
    const { name, email, password, image } = req.body;

    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false });
    }

    // Create a new user
    const newUser = {
        id: users.length + 1, // Generate user ID based on length of user array
        name: name,
        email: email,
        password: password, // In a real application, make sure to hash passwords
        image: image,
    };

    users.push(newUser); // Add new user to the array
    return res.status(201).json({ success: true, newUser }); // Return the created user
};

// Login a user
const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = users.find(user => user.email == email);
    if (!user) {
        return res.status(404).json({ success: false });
    }

    // Check password (in a real application, you'd compare hashed passwords)
    if (user.password != password) {
        return res.status(401).json({ success: false });
    }

    userInformation.login = user;

    return res.json({ success: true, user }); // Return user info (omit password in real apps)
};

const logout = (req, res) => {
    userInformation.login = {};

    return res.status(200).json({ "message": "Logged out successfully" })
}

// Export the functions
module.exports = {
    getUsers,
    signupUser,
    loginUser,
    logout
};
