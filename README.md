# Habin_HabitTracker

## Overview

Habin Habit Tracker is a Node.js-based backend application that helps users track their habits. This project provides APIs for managing habits and users, allowing users to create, update, delete, and track their habits. The aim is to help users form positive habits

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/olecko/Habin_HabitTracker.git
   ```
2. Install Dependencies:

   ```bash
   cd Habin_HabitTracker
   npm install
   ```
## Set up environment variables:

Create a `.env` file based on ```.env.example``` and set the required environment variables.

## Run the Application:

   ```bash
   npm start
   ```

## Usage

The API endpoints and their usage are documented in the routes directory:
   `/habits`: Handles CRUD operations for habits.
   `/users`: Manages user-related operations.

## Project Structure

   * src/: Contains the source code.
           controllers/: Controllers for handling business logic.
           middleware/: Middleware for authentication and error handling.
           models/: Database models for MongoDB.
           routes/: Express routes for API endpoints.
           app.js: Entry point of the application.

## Configuration

The project uses environment variables for configuration. Ensure to set up the required environment variables in the `.env` file.

## Testing

* Run tests using the following command:
   ```bash
   npm test
   ```

## Deployment

Ensure to configure deployment settings, environment variables, and database connections for the target environment before deployment.

## Contributing

* Contributions are welcome! Fork the repository, make your changes, and submit a pull request.
* Please follow the [Contributing Guidelines](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md)

## License
This project is licensed under the [MIT License](./LICENSE).

## Contact
For any inquiries or support, contact _Paul Emumena Michael_ via [Email](paulebi4eva@gmail.com)
