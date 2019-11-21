db = db.getSiblingDB('ChatUp');
db.createCollection('privateConversations', {
    validator: {
        $jsonSchema: {
            bsonType:"object",
            required: ["participants", "createdAt", "updatedAt"],
            properties: {
                participants: {
                    bsonType: "array",
                    description: "an array of an object holding the _id, name and profilePic of the people involved in a conversation"
                },
                createdAt: {
                    bsonType: "date",
                    description: "the first time the participants started conversating"
                },
                updatedAt : {
                    bsonType: "date",
                    description: "the last time a conversation was updated"
                }
            }
        }
    }
});
