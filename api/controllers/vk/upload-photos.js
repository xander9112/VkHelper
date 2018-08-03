const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'Upload photos',


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
      type: ['string'],
      required: true
    },
    caption: {
      description: 'Vk caption',
      type: 'string'
    }
  },


  exits: {
    success: {}
  },


  fn: async function (inputs, exits) {
    const {album_id, group_id, source, caption} = inputs;

    const photos = await VkUtils.uploadPhotos(this.req.headers.authorization, {
      album_id,
      group_id,
      source,
      caption
    });

    return exits.success(photos);
  }


};
