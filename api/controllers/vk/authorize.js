const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'Authorize',


  description: 'Authorize vk.',


  inputs: {
    login: {
      description: 'Vk email / phone',
      type: 'string',
      required: true
    },
    password: {
      description: 'Vk password',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {}
  },


  fn: async function (inputs, exits) {
    const {login, password} = inputs;

    try {
      const user = await VkUtils.androidApp(login, password);
      const account = await VkUtils.getAccountProfileInfo(user.token);

      return exits.success({...user, ...account});
    } catch (error) {
      sails.log(error);
    }


    return exits.success({});

  }


};
