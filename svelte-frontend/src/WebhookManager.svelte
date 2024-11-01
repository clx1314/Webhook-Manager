<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const webhooks = writable([]);
    let name = '';
    let enable = false;
    let urls = '';
    let errorMessage = ''; // Variable to hold error messages
    let successMessage = ''; // Variable to hold success messages

    async function fetchWebhooks() {
        try {
            const response = await fetch('http://localhost:3000/webhooks');
            if (!response.ok) throw new Error('Failed to fetch webhooks');
            const data = await response.json();
            webhooks.set(data);
        } catch (error) {
            errorMessage = error.message; // Set error message for display
        }
    }

    async function createWebhook() {
        try {
            const response = await fetch('http://localhost:3000/webhooks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    enable,
                    urls: urls.split(',').map(url => url.trim()),
                }),
            });
            if (!response.ok) throw new Error('Failed to create webhook');
            await fetchWebhooks(); // Refresh the webhook list after creation
            resetForm(); // Reset the form fields
            successMessage = 'Webhook created successfully!'; // Set success message
        } catch (error) {
            errorMessage = error.message; // Set error message for display
        }
    }

    function resetForm() {
        name = '';
        enable = false;
        urls = '';
        errorMessage = ''; // Clear any previous error messages
        successMessage = ''; // Clear any previous success messages
    }

    async function triggerWebhook(id) {
        try {
            const response = await fetch(`http://localhost:3000/webhooks/${id}/trigger`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: { token: '12345' } }),
            });
            if (!response.ok) throw new Error('Failed to trigger webhook');
            successMessage = `Webhook ${id} triggered successfully!`; // Set success message
        } catch (error) {
            errorMessage = error.message; // Set error message for display
        }
    }

    onMount(fetchWebhooks);
</script>

<h2 class="section-title">Manage Webhooks</h2>

<!-- Display error or success messages -->
{#if errorMessage}
    <p class="error-message">{errorMessage}</p>
{/if}
{#if successMessage}
    <p class="success-message">{successMessage}</p>
{/if}

<!-- Form for creating a new webhook -->
<form on:submit|preventDefault={createWebhook} class="form">
    <input type="text" bind:value={name} placeholder="Webhook Name" required class="input" />
    <label class="checkbox-label">
        <input type="checkbox" bind:checked={enable} class="checkbox" />
        Enable
    </label>
    <input type="text" bind:value={urls} placeholder="URLs (comma separated)" required class="input" />
    <button type="submit" class="btn">Create Webhook</button>
</form>

<h3 class="section-title">Existing Webhooks</h3>
<ul class="webhook-list">
    {#each $webhooks as webhook}
        <li class="webhook-item">
            <span>{webhook.name} - {webhook.enable ? 'Enabled' : 'Disabled'}</span>
            <button on:click={() => triggerWebhook(webhook.id)} class="btn-trigger">Trigger</button>
        </li>
    {/each}
</ul>

<style>
    .section-title {
        font-size: 1.5em;
        margin-bottom: 1em;
        color: #333;
        font-weight: bold;
    }

    .form {
        background-color: #f9f9f9;
        padding: 1.5em;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-bottom: 2em;
    }

    .input {
        width: 100%;
        padding: 0.5em;
        margin: 0.5em 0;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        margin: 0.5em 0;
    }

    .checkbox {
        margin-right: 0.5em;
    }

    .btn {
        background-color: #4a90e2;
        color: white;
        border: none;
        padding: 0.5em 1em;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }

    .btn:hover {
        background-color: #357ABD;
    }

    .webhook-list {
        list-style-type: none;
        padding: 0;
    }

    .webhook-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f0f0f0;
        padding: 0.5em;
        margin: 0.5em 0;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .btn-trigger {
        background-color: #5cb85c;
        color: white;
        border: none;
        padding: 0.5em 1em;
        border-radius: 4px;
        cursor: pointer;
    }

    .btn-trigger:hover {
        background-color: #4cae4c;
    }

    /* Styles for error and success messages */
    .error-message {
        color: red;
        margin-bottom: 1em;
    }

    .success-message {
        color: green;
        margin-bottom: 1em;
    }
</style>