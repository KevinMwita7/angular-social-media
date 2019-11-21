db = db.getSiblingDB('ChatUp');
db.createCollection('privateMessages', {
    validator: {
        $jsonSchema: {
            required: ['conversation_id', 'sender_id', 'body', 'createdAt'],
            properties: {
                conversation_id: {
                    bsonType: 'objectId',
                    description: '_id field of the conversation to which a message belongs to'
                },
                sender_id: {
                    bsonType: 'objectId',
                    description: '_id field of the person who sent the message'
                },
                body:{
                    bsonType: 'string',
                    description: 'the actual message being sent'
                },
                createdAt: {
                    bsonType: 'date',
                    description: 'time at which the message was sent'
                },
                updatedAt: {
                    bsonType: 'date',
                    description: 'records the time a message was edited, if any'
                }
            }
        }
    }
});
