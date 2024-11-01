// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let webhooks = []; // In-memory storage for webhooks

// Create a new webhook
app.post('/webhooks', (req, res) => {
    const { name, enable, urls } = req.body;
    const newWebhook = { id: webhooks.length + 1, name, enable, urls };
    webhooks.push(newWebhook);
    res.status(201).json(newWebhook);
});

// Read all webhooks
app.get('/webhooks', (req, res) => {
    res.json(webhooks);
});

// Read a specific webhook
app.get('/webhooks/:id', (req, res) => {
    const webhook = webhooks.find(w => w.id == req.params.id);
    if (webhook) {
        res.json(webhook);
    } else {
        res.status(404).json({ message: 'Webhook not found' });
    }
});

// Update a webhook
app.put('/webhooks/:id', (req, res) => {
    const { name, enable, urls } = req.body;
    const webhook = webhooks.find(w => w.id == req.params.id);
    if (webhook) {
        webhook.name = name;
        webhook.enable = enable;
        webhook.urls = urls;
        res.json(webhook);
    } else {
        res.status(404).json({ message: 'Webhook not found' });
    }
});

// Delete a webhook
app.delete('/webhooks/:id', (req, res) => {
    const index = webhooks.findIndex(w => w.id == req.params.id);
    if (index !== -1) {
        webhooks.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Webhook not found' });
    }
});

// Trigger a webhook
app.post('/webhooks/:id/trigger', async (req, res) => {
    const webhook = webhooks.find(w => w.id == req.params.id);
    if (!webhook) {
        return res.status(404).json({ message: 'Webhook not found' });
    }
    
    if (!webhook.enable) {
        return res.status(400).json({ message: 'Webhook is disabled' });
    }
    
    const data = req.body.data || {};
    
    // Perform token replacement in URLs
    const requests = webhook.urls.map(url => {
        const replacedUrl = url.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || '');
        return axios.post(replacedUrl, data);
    });

    try {
        await Promise.all(requests);
        res.status(200).json({ message: 'Webhook triggered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error triggering webhook', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});