const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'Delete photo',


  description: '',


  inputs: {
    owner_id: {
      description: 'Vk owner_id',
      type: 'number',
      required: true
    },
    photo_id: {
      description: 'Vk photo_id',
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {}
  },


  fn: async function (inputs, exits) {
    const {owner_id, photo_id} = inputs;

    const response = await VkUtils.deletePhotos(this.req.headers.authorization, {owner_id, photo_id});

    return exits.success(response);
  }
};
