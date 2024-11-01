# Webhook Service

This is a simple webhook management service that allows users to create, read, update, delete, and trigger webhooks. The service supports token replacement in URLs and handles HTTP requests to each configured URL when a webhook is triggered.

## Features
- CRUD operations for managing webhooks
- Supports token replacement in URLs
- Handles high volume of traffic
- JSON-based communication

## Technologies Used
- **Backend**: Node.js, Express, Axios
- **Frontend**: Svelte

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/clx1314/Webhook-Manager.git


### Running the Backend
    Navigate to the root directory:
    npm install
    node index.js

### Running the Frontend
    cd svelte-frontend
    npm install
    npm run dev

## Frontend Functionality

The frontend of the webhook service is built using Svelte and provides a user-friendly interface for managing webhooks. Here’s a breakdown of its key functionalities:

### Features
1. **Create a Webhook**: Users can create new webhooks by filling out a form with the webhook's name, enable flag, and a list of URLs.
2. **View Existing Webhooks**: The application displays a list of all existing webhooks, showing their names and whether they are enabled or disabled.
3. **Trigger a Webhook**: Users can trigger a webhook to execute its configured URLs with optional data for token replacement.
4. **Error and Success Messages**: The UI provides feedback on the success or failure of operations, ensuring users are informed about the status of their actions.

### Operation Steps

#### 1. Create a Webhook
- **Navigate to the form**: On the main page, locate the "Manage Webhooks" section.
- **Fill in the details**:
  - **Webhook Name**: Enter a descriptive name for the webhook.
  - **Enable**: Check this box if you want the webhook to be active.
  - **URLs**: Enter one or more URLs separated by commas. You can use tokens in the format `{{token}}` for dynamic data replacement.
- **Submit the form**: Click the "Create Webhook" button. If successful, you will see a confirmation message and the new webhook will appear in the list below.

#### 2. View Existing Webhooks
- Below the creation form, you will see a list of existing webhooks.
- Each webhook entry displays:
  - **Name**: The name of the webhook.
  - **Status**: Indicates whether the webhook is enabled or disabled.
  - **Trigger Button**: A button next to each webhook allows you to trigger the webhook.

#### 3. Trigger a Webhook
- To trigger a webhook, click the "Trigger" button next to the desired webhook in the list.
- The application will send a request to the configured URLs, replacing any tokens with the data provided in the request. For example, if you have a URL like `http://example.com/webhook/{{token}}`, and the token is set to "12345", the request will go to `http://example.com/webhook/12345`.
- Upon success or failure, a message will be displayed informing you of the operation's status.

### Example Usage
1. Create a webhook with the name "My Webhook", enable it, and set the URL to `http://example.com/webhook/{{token}}`.
2. After creation, find "My Webhook" in the list.
3. Click "Trigger" to execute the webhook. You should see a success message if the request is processed correctly.

### Error Handling
- If there are issues while creating or triggering webhooks, error messages will appear on the screen, guiding you on what went wrong.

This frontend functionality provides an intuitive way to manage webhooks effectively. If you encounter any issues or have suggestions for improvements, feel free to contribute!