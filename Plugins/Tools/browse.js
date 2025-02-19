
const fetch = require('node-fetch'); 

module.exports = {
  command: ['browse'],
  operate: async ({ m, text, Cypher, reply }) => {
    if (!text) return reply("Enter URL");

    try {
      let res = await fetch(text);

      if (res.headers.get('Content-Type').includes('application/json')) {
        let json = await res.json();
        await Cypher.sendMessage(m.chat, { text: JSON.stringify(json, null, 2) }, { quoted: m });
      } else {
        let resText = await res.text();
        await Cypher.sendMessage(m.chat, { text: resText }, { quoted: m });
      }

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    } catch (error) {
      reply(`Error fetching URL: ${error.message}`);
    }
  }
};