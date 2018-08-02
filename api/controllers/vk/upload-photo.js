const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'Upload photo',


  description: '',


  inputs: {
    album_id: {
      description: 'Vk album_id',
      type: 'number',
      required: true
    },
    group_id: {
      description: 'Vk group_id',
      type: 'number',
      required: true
    },
    source: {
      description: 'Vk photo',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {}
  },


  fn: async function (inputs, exits) {
    const {album_id, group_id, source, caption = ''} = inputs;

    const photo = await VkUtils.uploadPhoto(this.req.headers.authorization, {
      album_id,
      group_id,
      source,
      caption
    });

    return exits.success(photo);
  }


};
