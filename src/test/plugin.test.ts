import * as chai from "chai";

import { Core, LogLevelEnum } from "@webfaas/webfaas-core";

import WebFassPlugin from "../lib/WebFassPlugin";
import { Config } from "@webfaas/webfaas-core/lib/Config/Config";

describe("Plugin", () => {
    it("start and stop - new", async function(){
        let core = new Core();
        let plugin = new WebFassPlugin(core);
        chai.expect(typeof(plugin)).to.eq("object");
        core.getLog().changeCurrentLevel(LogLevelEnum.OFF);
        await plugin.startPlugin(core);
        await plugin.stopPlugin(core);
        await plugin.stopPlugin(core); //retry stop

        //config
        let configData = {
            "registry":{
                "route": [
                    {
                        "scope": "scope1",
                        "registry": "registry1"
                    },
                    {
                        "scope": "scope2",
                        "registry": "registry2"
                    },
                    {
                        "test": "test"
                    }
                ]
            }
        }
        let core2 = new Core( new Config(configData) );
        let plugin2 = new WebFassPlugin(core2);
        core2.getLog().changeCurrentLevel(LogLevelEnum.OFF);
        chai.expect(core2.getPackageRegistryManager().getRegistryNameByExternalRouting("@scope1/module1")).to.eq("registry1");
        chai.expect(core2.getPackageRegistryManager().getRegistryNameByExternalRouting("@scope2/module1")).to.eq("registry2");
    })
})