export interface HotelAttributes {
    GlobalPropertyID: number;
    SourcePropertyID: string;
    GlobalPropertyName: string;
    GlobalChainCode: string;
    PropertyAddress1: string;
    PropertyAddress2?: string;
    PrimaryAirportCode: string;
    CityID: number;
    PropertyStateProvinceID: number;
    PropertyZipPostal: string;
    PropertyPhoneNumber: string;
    PropertyFaxNumber: string;
    SabrePropertyRating: number;
    PropertyLatitude: number;
    PropertyLongitude: number;
    SourceGroupCode: string;
}

export interface CityAttributes {
    CityID: number;
    CityName: string;
    Country: string;
}

export interface RegionAttributes {
    PropertyStateProvinceID: number;
    PropertyStateProvinceName: string;
}