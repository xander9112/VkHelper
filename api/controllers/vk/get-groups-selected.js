const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'Get groups selected',


  description: '',


  inputs: {
    from: {
      description: 'Vk owner_id group',
      type: 'number',
      required: true
    },
    to: {
      description: 'Vk owner_id group',
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {}
  },


  fn: async function (inputs, exits) {
    const {from, to} = inputs;
    const {authorization} = this.req.headers;
    const groups = await VkUtils.getGroupsByIds(authorization, [from, to].join());

    const groupFrom = groups[0];
    const groupTo = groups[1];

    const albumsFrom = await VkUtils.photosGetAlbums(authorization, `-${from}`);
    const albumsTo = await VkUtils.photosGetAlbums(authorization, `-${to}`);

    groupFrom.albums = albumsFrom.items;
    groupTo.albums = albumsTo.items;

    return exits.success({from: groupFrom, to: groupTo});
  }
};
