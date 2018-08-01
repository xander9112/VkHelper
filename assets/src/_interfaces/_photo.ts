export interface IPhoto {
    id: number,
    album_id: number,
    owner_id: number,
    photo_75: string,
    photo_130: string,
    photo_604: string,
    width: number,
    height: number,
    text: string,
    date: number,
    post_id: number

    [key: string]: any
}
