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