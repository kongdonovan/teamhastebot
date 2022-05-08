/**
 * returns pong whenever someone says ping
 */

module.exports = {
    name: "ping",
    description: "Returns pong.",
    execute(message) {
        return message.channel.send("Pong!");
    }
}