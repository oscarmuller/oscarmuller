const { CosmosClient } = require('@azure/cosmos');

const endpoint = 'your-cosmosdb-endpoint';
const key = 'your-cosmosdb-key';
const client = new CosmosClient({ endpoint, key });

async function connectToDatabase() {
    try {
        const { database } = await client.databases.createIfNotExists({ id: 'dentist_office' });
        const { container } = await database.containers.createIfNotExists({ id: 'entries' });
        console.log('Connected to database');
        return container;
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

async function saveFormData(data) {
    try {
        const container = await connectToDatabase();
        await container.items.create(data);
        console.log('Data saved to database');
    } catch (error) {
        console.error('Error saving data to database:', error);
    }
}

module.exports = {
    connectToDatabase,
    saveFormData
};
