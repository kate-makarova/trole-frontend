import { environment } from 'src/environments/environment';

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
            environment.assets.css.foundation,
        )
    }

    public static getAll(): Theme[] {
        return  [
            {
                cssFile: environment.assets.css.foundation,
                themeCSSID: 'style-default'
            },
            {
                cssFile: '/foundation-dark.css',
                themeCSSID: 'style-dark'
            }
        ]
    }
}
