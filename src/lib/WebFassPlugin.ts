import { Core } from "@webfaas/webfaas-core";
import { IPlugin } from "@webfaas/webfaas-core/lib/PluginManager/IPlugin";
import { PackageRegistryRouting } from "./PackageRegistryRouting";

export default class WebFassPlugin implements IPlugin {
    private packageRegistryRouting: PackageRegistryRouting;

    async startPlugin(core: Core) {
    }

    async stopPlugin(core: Core) {
    }

    getPackageRegistryRouting(): PackageRegistryRouting{
        return this.packageRegistryRouting;
    }

    constructor(core: Core){
        this.packageRegistryRouting = new PackageRegistryRouting();

        let listRouteConfig: [] = core.getConfig().get("registry.route", []);
        for (let i = 0; i < listRouteConfig.length; i++){
            let item: any = listRouteConfig[i];

            if (item.scope && item.registry){
                this.packageRegistryRouting.addRegistryNameByScopeName(item.scope, item.registry);
            }
        }
        
        let self = this;
        core.getModuleManager().getPackageStoreManager().getPackageRegistryManager().getRegistryNameByExternalRouting = function(moduleName: string): string {
            return self.packageRegistryRouting.getRegistryNameByExternalRouting(moduleName);
        }
    }
}