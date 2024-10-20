import { databases, collections } from "./config";
import { ID, Query } from "appwrite";



const db = {};

collections.forEach((collection) => {
    db[collection.name] = {
        create: async (payload, id = ID.unique()) => {
            return await databases.createDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        update: async (id, payload) => {
            return await databases.updateDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        delete: async (id) => {
            return await databases.deleteDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        get: async (id) => {
            return await databases.getDocument(
                collection.dbId,
                collection.id,
                id
            );
        },


        list: async (userId, additionalQueries = []) => {
            // Create a query to filter by userId
            const userQuery = Query.equal("userId", [`"${userId}"`]);

            // Combine the user query with any additional queries passed in
            const queries = [userQuery, ...additionalQueries];

            // Fetch the filtered documents from the database
            return await databases.listDocuments(
                collection.dbId,
                collection.id,
                queries
            );
        },
    };
});

export { db };