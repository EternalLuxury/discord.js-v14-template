module.exports = async (client) => {

    console.log(`[INFO] ${client.user.tag} (${client.user.id}) is Ready!`);


    let guilds = client.guilds.cache.size;
    let members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
    let channels = client.channels.cache.size;

    const activities = [
        `${guilds} servers`,
        `${members} users`,
        `${channels} channels`,
    ]

    setInterval(() => {
        client.user.setPresence({ 
            activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: 2 }], 
            status: 'online', 
        });
    }, 15000)

  console.log("Copyright 2023 LuxuryDevelopment.")

};