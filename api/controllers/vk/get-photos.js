const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'Get photos',


  description: '',


  inputs: {
    owner_id: {
      description: 'Vk owner_id',
      type: 'number',
      required: true
    },
    album_id: {
      description: 'Vk album_id',
      type: 'number',
      required: true
    },
    photo_sizes: {
      description: 'Vk photo_sizes',
      type: 'number'
    }
  },


  exits: {
    success: {}
  },


  fn: async function (inputs, exits) {
    const {owner_id, album_id, photo_sizes} = inputs;

    const photos = await VkUtils.getPhotos(this.req.headers.authorization, {owner_id, album_id, photo_sizes});

    return exits.success(photos.items);
  }
};
