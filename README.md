# WebFaas - Plugin - PackageRegistryRouting

WebFaaS Plugin for [node](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

### Config
```json
{
    "registry.route": [
        {
            "scope": "scope1",
            "registry": "npm"
        },
        {
            "scope": "scope2",
            "registry": "github"
        }
    ]
}
```

### Example
```javascript
"use strict";

import { Core, IPackageRegistry } from "@webfaas/webfaas-core";
import WebFassPlugin from "../lib/WebFassPlugin";

const core = new Core();
const registryManager = core.getPackageRegistryManager();

export class PackageRegistry1 implements IPackageRegistry {
    private name: string;
    constructor(name: string){
        this.name = name;
    }
    getTypeName(): string {
        return this.name;
    }
    getManifest(name: string, etag?: string | undefined): Promise<import("@webfaas/webfaas-core").IPackageRegistryResponse> {
        throw new Error("Method not implemented.");
    }
    getPackage(name: string, version: string, etag?: string | undefined): Promise<import("@webfaas/webfaas-core").IPackageRegistryResponse> {
        throw new Error("Method not implemented.");
    }
    start(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

registryManager.addRegistry("registry1", "", new PackageRegistry1("registry1"));
registryManager.addRegistry("registry2", "", new PackageRegistry1("registry2"));

let plugin = new WebFassPlugin(core);
plugin.getPackageRegistryRouting().addRegistryNameByScopeName("scope1", "registry1");
plugin.getPackageRegistryRouting().addRegistryNameByScopeName("scope2", "registry2");

let managerItem = registryManager.getRegistryManagerItemByModuleName("@scope1");
console.log(managerItem?.registry.getTypeName());
let managerItem2 = registryManager.getRegistryManagerItemByModuleName("@scope2");
console.log(managerItem2?.registry.getTypeName());
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@webfaas/webfaas-plugin-packageregistryrouting.svg
[npm-url]: https://npmjs.org/package/@webfaas/webfaas-plugin-packageregistryrouting

[travis-image]: https://img.shields.io/travis/webfaas/webfaas-plugin-packageregistryrouting/master.svg?label=linux
[travis-url]: https://travis-ci.org/webfaas/webfaas-plugin-packageregistryrouting

[coveralls-image]: https://img.shields.io/coveralls/github/webfaas/webfaas-plugin-packageregistryrouting/master.svg
[coveralls-url]: https://coveralls.io/github/webfaas/webfaas-plugin-packageregistryrouting?branch=master