import * as chai from "chai";
import * as mocha from "mocha";
import { PackageRegistryRouting } from "../lib/PackageRegistryRouting";
import { IPackageRegistry, Core } from "@webfaas/webfaas-core";
import WebFassPlugin from "../lib/WebFassPlugin";

const core = new Core();
const registryManager = core.getModuleManager().getPackageStoreManager().getPackageRegistryManager();

export class PackageRegistryCustom implements IPackageRegistry {
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

registryManager.addRegistry("registry1", "", new PackageRegistryCustom("registry1"));
registryManager.addRegistry("registry2", "", new PackageRegistryCustom("registry2"));
registryManager.addRegistry("registry3", "", new PackageRegistryCustom("registry3"));

let plugin = new WebFassPlugin(core);
plugin.getPackageRegistryRouting().addRegistryNameByScopeName("scope1", "registry1");
plugin.getPackageRegistryRouting().addRegistryNameByScopeName("scope2", "registry2");
plugin.getPackageRegistryRouting().addRegistryNameByScopeName("scope3", "registry3");

describe("Package Registry Routing Plugin", () => {
    it("should return properties on call", function(){
        const packageRegistryRouting: PackageRegistryRouting = new PackageRegistryRouting();

        packageRegistryRouting.addRegistryNameByScopeName("webfaaslabs", "GITHUB");
        chai.expect(packageRegistryRouting.getRegistryNameByScopeName("webfaaslabs")).to.eq("GITHUB");
        chai.expect(packageRegistryRouting.getRegistryNameByExternalRouting("@webfaaslabs/mathsum")).to.eq("GITHUB");
        chai.expect(packageRegistryRouting.getRegistryNameByExternalRouting("mathsum")).to.eq("");
        packageRegistryRouting.addRegistryNameByScopeName("scope1", "route1");
        chai.expect(packageRegistryRouting.getRegistryNameByScopeName("scope1")).to.eq("route1");
        packageRegistryRouting.removeRegistryNameByScopeName("scope1");
        chai.expect(packageRegistryRouting.getRegistryNameByScopeName("scope1")).to.eq("");

        let managerItem = registryManager.getRegistryManagerItemByModuleName("@scope1");
        chai.expect(managerItem?.registry.getTypeName()).to.eq("registry1");
        let managerItem2 = registryManager.getRegistryManagerItemByModuleName("@scope2");
        chai.expect(managerItem2?.registry.getTypeName()).to.eq("registry2");
        let managerItem3 = registryManager.getRegistryManagerItemByModuleName("@scope3");
        chai.expect(managerItem3?.registry.getTypeName()).to.eq("registry3");
    })
})