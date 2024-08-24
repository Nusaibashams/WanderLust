# WanderLust

WanderLust is a web application that connects travelers with unique  experiences, similar to Airbnb. This platform allows users to sign up, create, edit, and manage listings, as well as explore various properties and experiences from around the world.

## Live Demo

Check out the live version of the project here: [WanderLust](https://wanderlust-ppaq.onrender.com)

## Features

- **User Authentication**:
- **Sign Up**: New users can register an account to access the platform.
- **Login**: Registered users can log in to manage their listings and interactions.
- **Logout**: Securely log out of your account when finished.

- **Listings Management**:
- **Create New Listings**: Hosts can add new properties or experiences to the platform, providing details such as location, price, and description.
- **Edit Listings**: Hosts can update the information on their existing listings to keep them accurate and up-to-date.
- **Delete Listings**: Hosts can remove listings that are no longer available or relevant.

- **Ratings and Reviews**:
- Users can leave reviews and rate properties and experiences they have stayed at or participated in.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Styling**: CSS, Bootstrap
- **Version Control**: Git, GitHub
- **Hosting**: Render

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/Nusaibashams/WanderLust.git
```
2. Navigate to the project directory:
```bash
cd WanderLust
```
3. Install dependencies:
```bash
npm install
```
4. Set up environment variables:
- Create a `.env` file in the root directory.
- Add the following variables:
```
MONGO_URI=your_mongodb_connection_string
CLOUDNAME=your_cloud_service_name
APIKEY=your_api_key
APISECRET=your_api_secret
ATLASDB=your_mongo_atlas_db_connection_string
SECRET=additional_secret_key_if_needed
```
5. Run the application:
```bash
npm start
```

## Usage

- **Sign Up/Log In**: Create an account or log in to manage your listings.
- **Create Listings**: Hosts can create new listings by providing all necessary details.
- **Edit/Delete Listings**: Hosts can modify or remove their listings as needed.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
