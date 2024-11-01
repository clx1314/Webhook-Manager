<script>
    import WebhookManager from './WebhookManager.svelte';

    let appTitle = "Webhook Manager - Interview Task";
</script>

<main class="app-container">
    <h1 class="app-title">{appTitle}</h1>
    <WebhookManager />
</main>

<style>
    .app-container {
        background-color: #f5f5f5;
        min-height: 100vh;
        padding: 2em;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .app-title {
        font-size: 2.5em;
        margin-bottom: 1.5em;
        color: #333;
        text-align: center;
    }
</style>