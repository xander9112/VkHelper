const {VK} = require('vk-io');
const vk = new VK();

const {auth, api, collect, upload} = vk;

vk.setCaptchaHandler((src, again, sid) => {
  return new Promise((resolve) => resolve());
});

module.exports = {
  androidApp: async (login, password, app = 664699, key = 'JU0ULwSYFqiWBsLgQ7gx') => {
    if (login.indexOf('@') > -1) {
      vk.setOptions({login, password, app, key});
    } else {
      vk.setOptions({phone: login, password, app, key});
    }
    const androidApp = auth.androidApp();

    try {
      return androidApp.run();
    } catch (e) {
      throw new Error(e);
    }

  },

  getGroups: async (accessToken, user_id) => {
    vk.setToken(accessToken);

    return api.groups.get({user_id, count: 0, extended: 1, fields: 'main_album_id'});
  },

  getAccountProfileInfo: async (accessToken) => {
    vk.setToken(accessToken);

    return api.account.getProfileInfo();
  },

  getGroupsByIds: async (accessToken, group_ids) => {
    vk.setToken(accessToken);

    return api.groups.getById({group_ids, fields: 'main_album_id'});
  },

  getPhotos: async (accessToken, {owner_id, album_id, photo_sizes = 0}) => {
    vk.setToken(accessToken);

    const stream = collect.photos.get({owner_id, album_id, photo_sizes});
    let items = [];
    let total = 0;

    return new Promise((resolve, reject) => {
      stream.on('error', reject);

      stream.on('data', payload => {
        total = payload.total;
        items = items.concat(payload.items);
      });

      stream.on('end', () => {
        resolve({total, items});
      });
    });
  },

  deletePhotos: async (accessToken, {owner_id, photo_id}) => {
    vk.setToken(accessToken);

    return vk.photos.delete({owner_id, photo_id});
  },

  uploadPhoto: async (accessToken, params) => {
    vk.setToken(accessToken);

    try {
      const photos = await upload.photoAlbum(params);

      return photos[0].payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};