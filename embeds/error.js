try{
    const error = new MessageEmbed()
    .setColor('#d50000')
    .setAuthor({ name: user, iconURL: pfp})
    .setTitle('Oh no! I see an error on the horizon!')
    .setDescription(`Unknow error occured! Please contact developer`)
    .setTimestamp()
    
    module.exports.e = error
}
catch{
    console.log('...')
}
