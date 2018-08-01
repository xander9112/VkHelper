export interface IGroup {
    id: number
    is_admin: number
    is_closed: number
    is_member: number
    name: string
    photo_50: string
    photo_100: string
    photo_200: string
    screen_name: string
    type: string
    main_album_id?: number

    [key: string]: any
}
