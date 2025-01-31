export class Theme
{
    public cssFile: string = '';
    public themeCSSID: string = '';

    constructor(id: string, file: string) {
        this.themeCSSID = id;
        this.cssFile = file;
    }

    public static getDefault(): Theme {
        return new Theme('style-default',
            'https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.min.css',
        )
    }

    public static getAll(): Theme[] {
        return  [
            {
                cssFile: 'https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.min.css',
                themeCSSID: 'style-default'
            },
            {
                cssFile: '/foundation-dark.css',
                themeCSSID: 'style-dark'
            }
        ]
    }
}