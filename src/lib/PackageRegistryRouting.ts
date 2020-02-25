import { ModuleNameUtil } from "@webfaas/webfaas-core";

export class PackageRegistryRouting {
    private listRegistryNameByScope: Map<string, string> = new Map<string, string>();
    
    /**
     * return registry name by scope name
     * @param scopeName scope name
     */
    getRegistryNameByScopeName(scopeName: string): string{
        return this.listRegistryNameByScope.get(scopeName) || "";
    }

    /**
     * add route by scope name
     * @param scopeName scope name
     * @param registryName registry name
     */
    addRegistryNameByScopeName(scopeName: string, registryName: string): void{
        this.listRegistryNameByScope.set(scopeName, registryName);
    }

    /**
     * remove route by scope name
     * @param scopeName scope name
     */
    removeRegistryNameByScopeName(scopeName: string): void{
        this.listRegistryNameByScope.delete(scopeName);
    }

    getRegistryNameByExternalRouting(moduleName: string): string{
        let moduleNameData = ModuleNameUtil.parse(moduleName, "");
        return this.getRegistryNameByScopeName(moduleNameData.scopeName);
    }
}