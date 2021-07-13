/**
 * @ignore
 */
declare const TCCommonService;
/**
 * @ignore
 */
const $http = TCCommonService.$http;
/**
 * @ignore
 */
declare const AmadeusHosResJsonSchemaValidationService;
const hotelSchema = require('./../../jsonschema/hotelData.json');

class HelloWorld {
    /**
      * Method to check whether property value is changed or not
      * @param changedProperties
      * @param atrributeName
      * @returns boolean value
      * @memberof CommonServiceClass
      */
    public async getJsonData() {
        try {
            const response = await $http.post('https://run.mocky.io/v3/876081b5-be25-4e1a-b0e5-b0d4837abeb0');
            const responseJson = await response.json();
            console.log('check AJV Json validator reading with json', responseJson, hotelSchema);
            // tslint:disable-next-line: max-line-length
            const isValid = AmadeusHosResJsonSchemaValidationService.JsonSchemaValidatorService.validateJSONSchema(hotelSchema, responseJson);
            console.log(JSON.stringify(isValid));
            if (isValid === true) {
                return responseJson; // Success code : if valid data returns
            } else {
                return isValid; // Error code : if invalid data returns code to handle code
            }
        } catch (errorResponse) {
            throw await errorResponse.json();
        }
        // 'https://run.mocky.io/v3/ecfc454b-3975-4c66-8d51-b5c84d83476f' // true
        // 'https://run.mocky.io/v3/876081b5-be25-4e1a-b0e5-b0d4837abeb0' // false
    }
}

export const HelloWorldService = new HelloWorld();
