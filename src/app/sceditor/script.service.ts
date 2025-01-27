interface Scripts {
    name: string;
    src: string;
}

export class ScriptService {

    private scripts: any = {};

    constructor(scriptStore: Scripts[]) {
        scriptStore.forEach((script: any) => {
            this.scripts[script.name] = {
                loaded: false,
                src: script.src
            };
        });
    }

    async load(...scripts: string[]) {
        const promises: any[] = [];
        for (const script of scripts) {
            await this.loadScript(script);
        }
        return Promise.all(promises);
    }

    loadScript(name: string) {
        return new Promise((resolve, reject) => {
            // resolve if already loaded
            if (this.scripts[name].loaded) {
                resolve({ script: name, loaded: true, status: 'Already Loaded' });
            } else {
                // load script
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.scripts[name].src;
                script.onload = () => {
                    this.scripts[name].loaded = true;
                    console.log(`${name} Loaded.`);
                    resolve({ script: name, loaded: true, status: 'Loaded' });
                };
                script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        });
    }
}