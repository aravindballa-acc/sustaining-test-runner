const path = require('path');

const projectsCfg = {
    "repositoryUrl": "https://github.com/extjs/SDK.git",
    "projectRoot": "../projects",
    "sdkPath": "sdk",
    "testcasePath": "testcases",
    "projects": [
        {
            "id": "SDK4",
            "name": "ExtJS 4.2.x",
            "version": 4.2,
            "branch": "ext-4.2.x",
            "path": "4.2/",
            "resources": {
                "framework": "extjs/ext.js",
                "themes": {
                    "path": "packages/",
                    "buildPath": "packages/{name}/build/resources/{name}-all-debug.css",
                    "exclude": "ext-theme-(access|base|classic-sandbox|neutral)"
                }
            }
        },
        {
            "id": "SDK5",
            "name": "ExtJS 5.1.x",
            "version": 5,
            "repoUrl": "https://github.com/extjs/SDK/tree/ext-5.1.x",
            "path": "5.1/",
            "resources": {
                "framework": "ext/ext.js",
                "themes": {
                    "path": "ext/packages/",
                    "buildPath": "ext/packages/{name}/build/resources/{name}-all-debug.css",
                    "exclude": "ext-theme-(access|base|classic-sandbox|crisp-touch|neptune-touch|neutral)"
                },
                "specs": {
                    "path": "ext/test/",
                    "suiteFile": "bootstrap-specs.js",
                    "runner": "local/"
                }
            }
        },
        {
            "id": "SDK62C",
            "name": "ExtJS 6.2.x (Classic)",
            "version": 6.2,
            "repoUrl": "https://github.com/extjs/SDK/tree/ext-6.2.x",
            "path": "6.2/",
            "resources": {
                "framework": "ext/ext.js",
                "themes": {
                    "path": "ext/classic/",
                    "buildPath": "ext/build/classic/{name}/build/resources/{name}-all-debug.css",
                    "exclude": "theme-(access|base|classic-sandbox|crisp-touch|neptune-touch|neutral)"
                },
                "specs": {
                    "path": "ext/classic/classic/test/",
                    "suiteFile": "bootstrap-specs.js",
                    "runner": "local/"
                }
            }
        },
        {
            "id": "SDK62M",
            "name": "ExtJS 6.2.x (Modern)",
            "version": 6.2,
            "repoUrl": "https://github.com/extjs/SDK/tree/ext-6.2.x",
            "path": "6.2/",
            "resources": {
                "framework": "ext/ext-modern.js",
                "themes": {
                    "path": "ext/modern/",
                    "buildPath": "ext/build/modern/{name}/build/resources/{name}-all-debug.css",
                    "exclude": "theme-(base|device-base)"
                },
                "specs": {
                    "path": "ext/modern/modern/test/",
                    "suiteFile": "bootstrap-specs.js",
                    "runner": "local/"
                }
            }
        },
        {
            "id": "SDK65C",
            "name": "ExtJS 6.5.x (Classic)",
            "version": 6.5,
            "repoUrl": "https://github.com/extjs/SDK/tree/ext-6.5.x",
            "path": "6.5/",
            "resources": {
                "framework": "ext/ext.js",
                "themes": {
                    "path": "ext/classic/",
                    "buildPath": "ext/build/classic/{name}/build/resources/{name}-all-debug.css",
                    "exclude": "theme-(access|base|classic-sandbox|crisp-touch|neptune-touch|neutral)"
                },
                "specs": {
                    "path": "ext/classic/classic/test/",
                    "suiteFile": "bootstrap-specs.js",
                    "runner": "local/"
                }
            }
        },
        {
            "id": "SDK65M",
            "name": "ExtJS 6.5.x (Modern)",
            "version": 6.5,
            "repoUrl": "https://github.com/extjs/SDK/tree/ext-6.5.x",
            "path": "6.5/",
            "resources": {
                "framework": "ext/ext-modern.js",
                "themes": {
                    "path": "ext/modern/",
                    "buildPath": "ext/build/modern/{name}/build/resources/{name}-all-debug.css",
                    "exclude": "theme-(base|device-base)"
                },
                "specs": {
                    "path": "ext/modern/modern/test/",
                    "suiteFile": "bootstrap-specs.js",
                    "runner": "local/"
                }
            }
        }
    ]
}

class Config {
    static getRootPath () {
        return path.join(__dirname, projectsCfg.projectRoot);
    }

    static getSDKPath () {
        return path.join(__dirname, projectsCfg.projectRoot, projectsCfg.sdkPath);
    }

    static getPathForSDK (id) {
        let project = this.getProject(id);

        return path.join(__dirname, projectsCfg.projectRoot, projectsCfg.sdkPath, project.path);
    }
    
    static getTestcasePath () {
        return path.join(__dirname, projectsCfg.projectRoot, projectsCfg.testcasePath);
    }

    static getConfig () {
        return projectsCfg;
    }

    static getProjects () {
        return new Map(projectsCfg.projects.map((project) => [project.id, project]));
    }

    static getProject (id) {
        let project = this.getProjects().get(id);

        if (!project) {
            throw new Error(`Project ${id} does not exist.`);
        }

        return project;
    }
}

module.exports = Config
