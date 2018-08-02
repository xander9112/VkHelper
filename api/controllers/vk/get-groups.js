const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'Get groups',


  description: '',


  inputs: {
    userId: {
      description: 'Vk user_id',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a number.
      type: 'number',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: true
    }
  },


  exits: {
    success: {
    }
  },


  fn: async function (inputs, exits) {
    const groups = await VkUtils.getGroups(this.req.headers.authorization, inputs.userId);

    return exits.success(groups);
  }


};
