const mongoose = require("mongoose")

module.exports = async (client) => {
  const mongo = process.env.mongo || client.config.mongo
    try {
        await mongoose.connect(mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log('[INFO] MongoDB Successfully Loaded'));
    } catch (error) {
        console.log(error);
    }
} 