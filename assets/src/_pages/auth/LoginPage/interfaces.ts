export interface IProps {
    logout: () => {},
    login: (username: string, password: string) => {},
    loggingIn: boolean,
    root: string,
    paper: string,
    button: string,
}

export interface IState {
    login: string,
    loading: boolean,
    password: string,
    submitted: boolean,

    [index: string]: any;
}
