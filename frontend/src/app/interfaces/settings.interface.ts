export interface Address {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    zipOrPostalCode: string;
    stateOrProvinceOrRegion: string;
    city: string;
    country: string;
    phoneNumber: number;
    phoneType?: string;
}

export interface Passwords {
    oldPassword: string;
    newPassword: string;
}

export interface Profile {
    username?: string;
    email?: string;
    bio?: string;
}

export interface Token {
    token: string;
}
