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
    const groups = await VkUtils.getGroupsByIds(this.req.headers.authorization, [from, to].join());

    return exits.success({
      from: groups[0],
      to: groups[1]
    });
  }


};
