/**
 * returns pong whenever someone says ping
 */

module.exports = {
    name: "ping",
    description: "Returns pong.",
    arglen: 0,
    argrequired: true,
    execute(message) {
        return message.channel.send("Pong!");
    }
}