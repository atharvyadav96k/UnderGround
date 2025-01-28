const client = require('../redis/client');

exports.storeMsg = async (id, data) => {
    const value = {
        you: id,
        data: data
    };
    await client.rpush("msg", JSON.stringify(value));
    if (await client.llen("msg") > 10) {
        await client.lpop("msg");
    }
};

exports.getMessages = async () => {
    const val = await client.lrange("msg", 0, -1);
    const messages = val.map(message => JSON.parse(message));
    // console.log(messages);
    return messages;
};