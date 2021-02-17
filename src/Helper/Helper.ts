export class Helper {

    /**
     * @static
     * @param input
     * @returns {boolean}
     */
    public static isEmpty = <T>(input: T): any => {
        if(typeof input === 'object'){
            return Object.keys(input).length === 0;
        }else if(Array.isArray(input)){
            return input.length === 0;
        }
    }

    /**
     * @static
     * @param input
     * @returns {string}
     */
    public static uppercaseFirstLetter = (input: string): string => {
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
}