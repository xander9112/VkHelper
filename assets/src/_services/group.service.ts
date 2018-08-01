import {fetchApi} from "../_helpers";

const getGroups = (userId: number) => fetchApi(`api/groups?userId=${userId}`);

const getSelectedGroups = (from: number, to: number) => fetchApi(`api/groupsSelected?from=${from}&to=${to}`);
const getPhotos = ({ownerId, albumId, photo_sizes = 0, offset = 0}) =>
    fetchApi(`api/photosGet?owner_id=-${ownerId}&album_id=${albumId}&offset=${offset}&photo_sizes=${photo_sizes}`);

const uploadPhoto = ({albumId, groupId, photo}) => fetchApi("api/uploadPhoto", {
    method: "POST",
    body: JSON.stringify({albumId, groupId, photo})
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
