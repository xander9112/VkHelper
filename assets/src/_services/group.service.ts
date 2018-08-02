import {fetchApi} from "../_helpers";

const urls = {
  getGroups: "vk/get-groups",
  getGroupsSelected: "vk/get-groups-selected",
  getPhotos: "vk/get-photos",
  uploadPhoto: "vk/upload-photo"
};

const getGroups = (userId: number) => fetchApi(`${urls.getGroups}?userId=${userId}`);

const getSelectedGroups = (from: number, to: number) => fetchApi(`${urls.getGroupsSelected}?from=${from}&to=${to}`);
const getPhotos = ({ownerId, albumId, photo_sizes = 0, offset = 0}) =>
  fetchApi(`${urls.getPhotos}?owner_id=-${ownerId}&album_id=${albumId}&offset=${offset}&photo_sizes=${photo_sizes}`);

const uploadPhoto = ({albumId, groupId, source}) => fetchApi(urls.uploadPhoto, {
  method: "POST",
  body: JSON.stringify({album_id: albumId, group_id: groupId, source})
});
const updateGroup = (group) => fetchApi(`groups/${group.id}`, {method: "PUT", body: JSON.stringify(group)});
const deleteGroup = (group) => fetchApi(`groups/${group.id}`, {method: "DELETE", body: JSON.stringify(group)});

export const groupService = {
  getGroups,
  getSelectedGroups,
  getPhotos,
  uploadPhoto,
  updateGroup,
  deleteGroup
};
