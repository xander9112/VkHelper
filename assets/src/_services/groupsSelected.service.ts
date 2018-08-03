import {fetchApi} from "../_helpers";

const urls = {
  getGroups: "vk/get-groups",
  getGroupsSelected: "vk/get-groups-selected",
  getPhotos: "vk/get-photos",
  uploadPhotos: "vk/upload-photos"
};

const getSelectedGroups = (from: number, to: number) => fetchApi(`${urls.getGroupsSelected}?from=${from}&to=${to}`);
const getPhotos = ({owner_id, album_id}) =>
  fetchApi(`${urls.getPhotos}?owner_id=-${owner_id}&album_id=${album_id}`);

const uploadPhotos = ({album_id, group_id, source, caption}) => fetchApi(urls.uploadPhotos, {
  method: "POST",
  body: JSON.stringify({album_id, group_id, source, caption})
});

export const groupsSelectedService = {
  getSelectedGroups,
  getPhotos,
  uploadPhotos
};
