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
export interface Location {
    city?: string;
    country?: string;
}
