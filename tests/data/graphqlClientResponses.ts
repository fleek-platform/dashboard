export const me = {
    "data": {
        "user": {
            "__typename": "User",
            "id": "cls4v90nr0000l708op4q669h",
            "avatar": null,
            "username": "0xB09-3D22",
            "firstName": null,
            "email": "helder+test@fleek.xyz",
            "walletAddress": "0xB0984f2Cd03d88224cba8deF44d82508B7c93D22",
            "githubUserAccessToken": "ghu_vDqcq882A1QApkmTSrQYzGzZOC2R0U4HUOUl",
            "pendingInvitations": [],
            "secretKeys": [],
            "project": {
                "__typename": "Project",
                "id": "cls4v91mt0001l708wu51eozd",
                "name": "First Project",
                "currentUserMembership": {
                    "__typename": "Membership",
                    "permissionGroup": {
                        "__typename": "PermissionGroup",
                        "id": "clvuwdf640000cau9t0ppmbri",
                        "name": "Owner",
                        "permissions": [
                            "PROJECT_EDIT_NAME",
                            "PROJECT_EDIT_AVATAR",
                            "PROJECT_DELETE",
                            "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                            "STORAGE_EDIT_SETTINGS",
                            "STORAGE_UPLOAD",
                            "STORAGE_EDIT_NAME",
                            "STORAGE_DELETE",
                            "STORAGE_VIEW_INFORMATION",
                            "STORAGE_VIEW_LIST",
                            "PRIVATE_GATEWAY_CREATE",
                            "PRIVATE_GATEWAY_UPDATE_NAME",
                            "PRIVATE_GATEWAY_DELETE",
                            "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                            "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                            "PRIVATE_GATEWAY_DELETE_DOMAIN",
                            "PRIVATE_GATEWAY_VIEW",
                            "SITE_CREATE",
                            "SITE_DEPLOY",
                            "SITE_VIEW_OVERVIEW",
                            "SITE_VIEW_BUILD_SETTINGS",
                            "SITE_EDIT_BUILD_SETTINGS",
                            "SITE_VIEW_ENV_VARIABLES",
                            "SITE_EDIT_ENV_VARIABLES",
                            "SITE_VIEW_DEPLOYMENTS",
                            "SITE_VIEW_ANALYTICS",
                            "SITE_EDIT_NAME",
                            "SITE_EDIT_SLUG",
                            "SITE_EDIT_AVATAR",
                            "SITE_PURGE_CACHE",
                            "SITE_DELETE",
                            "SITE_ADD_AND_VERIFY_DOMAIN",
                            "SITE_CHANGE_PRIMARY_DOMAIN",
                            "SITE_DELETE_DOMAIN",
                            "SITE_ADD_AND_VERIFY_ENS",
                            "SITE_DELETE_ENS",
                            "SITE_ADD_GIT_INTEGRATION",
                            "SITE_REMOVE_GIT_INTEGRATION",
                            "FUNCTION_CREATE",
                            "FUNCTION_DEPLOY",
                            "FUNCTION_EDIT_SETTINGS",
                            "FUNCTION_DELETE",
                            "FUNCTION_VIEW",
                            "FUNCTION_VIEW_DEPLOYMENT",
                            "IPNS_CREATE_RECORD",
                            "IPNS_PUBLISH_RECORD",
                            "IPNS_DELETE_RECORD",
                            "IPNS_VIEW",
                            "BILLING_VIEW",
                            "BILLING_MANAGE",
                            "APPLICATION_VIEW",
                            "APPLICATION_CREATE",
                            "APPLICATION_EDIT",
                            "MEMBER_TEAM_VIEW",
                            "MEMBER_INVITE",
                            "MEMBER_CHANGE_PERMISSIONS",
                            "MEMBER_ASSIGN_OWNER",
                            "MEMBER_DELETE_OTHERS",
                            "TEMPLATE_CREATE",
                            "AGENT_VIEW_LIST",
                            "AGENT_CREATE",
                            "AGENT_VIEW",
                            "AGENT_UPDATE",
                            "AGENT_DELETE"
                        ]
                    }
                }
            }
        }
    }
};

export const project = {
    "data": {
        "project": {
            "__typename": "Project",
            "id": "cls4v91mt0001l708wu51eozd",
            "name": "First Project",
            "backupStorageOnArweave": false,
            "backupStorageOnFilecoin": true,
            "allowAccessFromOfacCountries": true,
            "avatar": null,
            "updatedAt": "2025-02-06T09:42:15.489Z",
            "currentUserMembership": {
                "__typename": "Membership",
                "permissionGroup": {
                    "__typename": "PermissionGroup",
                    "id": "clvuwdf640000cau9t0ppmbri",
                    "name": "Owner",
                    "permissions": [
                        "PROJECT_EDIT_NAME",
                        "PROJECT_EDIT_AVATAR",
                        "PROJECT_DELETE",
                        "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                        "STORAGE_EDIT_SETTINGS",
                        "STORAGE_UPLOAD",
                        "STORAGE_EDIT_NAME",
                        "STORAGE_DELETE",
                        "STORAGE_VIEW_INFORMATION",
                        "STORAGE_VIEW_LIST",
                        "PRIVATE_GATEWAY_CREATE",
                        "PRIVATE_GATEWAY_UPDATE_NAME",
                        "PRIVATE_GATEWAY_DELETE",
                        "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                        "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                        "PRIVATE_GATEWAY_DELETE_DOMAIN",
                        "PRIVATE_GATEWAY_VIEW",
                        "SITE_CREATE",
                        "SITE_DEPLOY",
                        "SITE_VIEW_OVERVIEW",
                        "SITE_VIEW_BUILD_SETTINGS",
                        "SITE_EDIT_BUILD_SETTINGS",
                        "SITE_VIEW_ENV_VARIABLES",
                        "SITE_EDIT_ENV_VARIABLES",
                        "SITE_VIEW_DEPLOYMENTS",
                        "SITE_VIEW_ANALYTICS",
                        "SITE_EDIT_NAME",
                        "SITE_EDIT_SLUG",
                        "SITE_EDIT_AVATAR",
                        "SITE_PURGE_CACHE",
                        "SITE_DELETE",
                        "SITE_ADD_AND_VERIFY_DOMAIN",
                        "SITE_CHANGE_PRIMARY_DOMAIN",
                        "SITE_DELETE_DOMAIN",
                        "SITE_ADD_AND_VERIFY_ENS",
                        "SITE_DELETE_ENS",
                        "SITE_ADD_GIT_INTEGRATION",
                        "SITE_REMOVE_GIT_INTEGRATION",
                        "FUNCTION_CREATE",
                        "FUNCTION_DEPLOY",
                        "FUNCTION_EDIT_SETTINGS",
                        "FUNCTION_DELETE",
                        "FUNCTION_VIEW",
                        "FUNCTION_VIEW_DEPLOYMENT",
                        "IPNS_CREATE_RECORD",
                        "IPNS_PUBLISH_RECORD",
                        "IPNS_DELETE_RECORD",
                        "IPNS_VIEW",
                        "BILLING_VIEW",
                        "BILLING_MANAGE",
                        "APPLICATION_VIEW",
                        "APPLICATION_CREATE",
                        "APPLICATION_EDIT",
                        "MEMBER_TEAM_VIEW",
                        "MEMBER_INVITE",
                        "MEMBER_CHANGE_PERMISSIONS",
                        "MEMBER_ASSIGN_OWNER",
                        "MEMBER_DELETE_OTHERS",
                        "TEMPLATE_CREATE",
                        "AGENT_VIEW_LIST",
                        "AGENT_CREATE",
                        "AGENT_VIEW",
                        "AGENT_UPDATE",
                        "AGENT_DELETE"
                    ]
                }
            }
        }
    }
};

export const projects = {
    "data": {
        "projects": {
            "__typename": "ProjectsWithAggregation",
            "data": [
                {
                    "__typename": "Project",
                    "id": "clxkmaoi10002i2d4bv8o9sml",
                    "name": "202406181727",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-06-18T16:27:16.489Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cls4v91mt0001l708wu51eozd",
                    "name": "First Project",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2025-02-06T09:42:15.489Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "clu1lnqa40000kz09upet7zfj",
                    "name": "foobar202403211902",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-03-21T19:02:41.357Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm10jq5vm0000z0szq3n242di",
                    "name": "fri13sep1058",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-13T09:58:45.826Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm11579ow000211kev8jucy7l",
                    "name": "fri13sep2059",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-13T19:59:55.857Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0qsxrql00007izjxqqklxzg",
                    "name": "fri6sep1518",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-06T14:18:55.533Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "clsuoh0gc0002jw08acjp3k49",
                    "name": "fufufu",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-02-20T18:07:21.228Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cls9918b70000jn09qnzfj2gx",
                    "name": "Second project",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-02-05T18:12:00.979Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "clubi0q73000cjv09y95bhvdc",
                    "name": "test202403281718",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-03-28T17:18:31.071Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "clubjt6q30000jo08zejod37z",
                    "name": "test202403281808",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-03-28T18:08:38.475Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "clubjx3np0000jn08jxec91li",
                    "name": "test202403281811",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-03-28T18:11:41.126Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "clubjzqzd0003jn086tuvgxb0",
                    "name": "test202403281813",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-03-28T18:13:44.665Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cls993lgr0003jn09867pxay1",
                    "name": "Third project",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-02-05T18:13:51.339Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm1946mzl000214mmag4x6xsz",
                    "name": "thu19sep1053",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-19T09:53:36.226Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm198tj5w0000h7p00hzu7hqi",
                    "name": "thu19sep1303",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-19T12:03:22.820Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "clvz0buf30005vfhwau0avcsv",
                    "name": "thu9may2k240949",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-05-09T08:49:27.231Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0w6623600005m7eqjdc8qe1",
                    "name": "tue10sep0928",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-10T08:28:08.082Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0wmi4r80000jspyxfp4o9s2",
                    "name": "tue10sep17h05",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-10T16:05:25.268Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0xr3jxi00004uuobdi0jlvm",
                    "name": "wed11sep1201",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-11T11:01:49.351Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0xs4f2q000210b8xwtw0n3f",
                    "name": "wed11sep1230",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-11T11:30:29.331Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0xswbh40000c5lywvhl4ufj",
                    "name": "wed11sep1252",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-11T11:52:11.032Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0xt9jkm0002tiiw56xoy5ns",
                    "name": "wed11sep1302",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-11T12:02:28.054Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0xtdpql0002hb090xz2jppd",
                    "name": "wed11sep1305",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-11T12:05:42.669Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0xulkig0002k5jab1y2wdrc",
                    "name": "wed11sep1339",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-11T12:39:48.761Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                },
                {
                    "__typename": "Project",
                    "id": "cm0xzrvru0002qxkol1yxu2ai",
                    "name": "wed11sep1604",
                    "backupStorageOnArweave": false,
                    "backupStorageOnFilecoin": true,
                    "avatar": null,
                    "updatedAt": "2024-09-11T15:04:41.371Z",
                    "currentUserMembership": {
                        "__typename": "Membership",
                        "permissionGroup": {
                            "__typename": "PermissionGroup",
                            "id": "clvuwdf640000cau9t0ppmbri",
                            "name": "Owner",
                            "permissions": [
                                "PROJECT_EDIT_NAME",
                                "PROJECT_EDIT_AVATAR",
                                "PROJECT_DELETE",
                                "PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES",
                                "STORAGE_EDIT_SETTINGS",
                                "STORAGE_UPLOAD",
                                "STORAGE_EDIT_NAME",
                                "STORAGE_DELETE",
                                "STORAGE_VIEW_INFORMATION",
                                "STORAGE_VIEW_LIST",
                                "PRIVATE_GATEWAY_CREATE",
                                "PRIVATE_GATEWAY_UPDATE_NAME",
                                "PRIVATE_GATEWAY_DELETE",
                                "PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN",
                                "PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN",
                                "PRIVATE_GATEWAY_DELETE_DOMAIN",
                                "PRIVATE_GATEWAY_VIEW",
                                "SITE_CREATE",
                                "SITE_DEPLOY",
                                "SITE_VIEW_OVERVIEW",
                                "SITE_VIEW_BUILD_SETTINGS",
                                "SITE_EDIT_BUILD_SETTINGS",
                                "SITE_VIEW_ENV_VARIABLES",
                                "SITE_EDIT_ENV_VARIABLES",
                                "SITE_VIEW_DEPLOYMENTS",
                                "SITE_VIEW_ANALYTICS",
                                "SITE_EDIT_NAME",
                                "SITE_EDIT_SLUG",
                                "SITE_EDIT_AVATAR",
                                "SITE_PURGE_CACHE",
                                "SITE_DELETE",
                                "SITE_ADD_AND_VERIFY_DOMAIN",
                                "SITE_CHANGE_PRIMARY_DOMAIN",
                                "SITE_DELETE_DOMAIN",
                                "SITE_ADD_AND_VERIFY_ENS",
                                "SITE_DELETE_ENS",
                                "SITE_ADD_GIT_INTEGRATION",
                                "SITE_REMOVE_GIT_INTEGRATION",
                                "FUNCTION_CREATE",
                                "FUNCTION_DEPLOY",
                                "FUNCTION_EDIT_SETTINGS",
                                "FUNCTION_DELETE",
                                "FUNCTION_VIEW",
                                "FUNCTION_VIEW_DEPLOYMENT",
                                "IPNS_CREATE_RECORD",
                                "IPNS_PUBLISH_RECORD",
                                "IPNS_DELETE_RECORD",
                                "IPNS_VIEW",
                                "BILLING_VIEW",
                                "BILLING_MANAGE",
                                "APPLICATION_VIEW",
                                "APPLICATION_CREATE",
                                "APPLICATION_EDIT",
                                "MEMBER_TEAM_VIEW",
                                "MEMBER_INVITE",
                                "MEMBER_CHANGE_PERMISSIONS",
                                "MEMBER_ASSIGN_OWNER",
                                "MEMBER_DELETE_OTHERS",
                                "TEMPLATE_CREATE",
                                "AGENT_VIEW_LIST",
                                "AGENT_CREATE",
                                "AGENT_VIEW",
                                "AGENT_UPDATE",
                                "AGENT_DELETE"
                            ]
                        }
                    }
                }
            ]
        }
    }
};

export const listFolder = {
    "data": {
        "listFolder": {
            "__typename": "ListFolderWithAggregation",
            "pageCount": 6,
            "data": [
                {
                    "__typename": "Pin",
                    "id": "clzk0yl91000513k5yjm9p8dy",
                    "cid": "bafybeib4el7un75bc4up5eydpyzapr6vzyhmwat6r4qwbgvh3hisgnw4im",
                    "size": 1077125,
                    "sizeBigInt": 1077125,
                    "extension": "js",
                    "createdAt": "2024-08-07T15:49:25.096Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzk0dw5x0005263b3lt6mp1g",
                    "cid": "bafybeie5c7kxfde2l7vkjn4cqhz2kzk32wboctu2pyg6omqu6mzdrk264a",
                    "size": 1067178,
                    "sizeBigInt": 1067178,
                    "extension": "js",
                    "createdAt": "2024-08-07T15:33:19.428Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzjzsqqg000eqssut55utpe8",
                    "cid": "bafybeibnsrx75tpjsxm2eaczdahaxgmsuvxbskc3z5xmqqhutyc6mfhd3e",
                    "size": 1077817,
                    "sizeBigInt": 1077817,
                    "extension": "js",
                    "createdAt": "2024-08-07T15:16:52.656Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzisu601000bxnqh1urxqyrm",
                    "cid": "bafybeicaefezh2apsxklfcfseov7fcz5itsqtuhzhdll6u4q35mory2n2u",
                    "size": 1076722,
                    "sizeBigInt": 1076722,
                    "extension": "js",
                    "createdAt": "2024-08-06T19:14:15.600Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzisnmdi000e3a77fhbqavfy",
                    "cid": "bafybeicrmhxt5un6vq3jg4vncixgig62xsydftn3hx4vj4sjl6efobrqv4",
                    "size": 1065956,
                    "sizeBigInt": 1065956,
                    "extension": "js",
                    "createdAt": "2024-08-06T19:09:10.237Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzisi7us0008hm59y9nrv3ux",
                    "cid": "bafybeiebvtmrnofyg476qfqxxvzaxjqy2y5lhqwmv3ccrqca4xgqnl4ihi",
                    "size": 1065956,
                    "sizeBigInt": 1065956,
                    "extension": "js",
                    "createdAt": "2024-08-06T19:04:58.134Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzis7tdg000b3a77lwgoys3s",
                    "cid": "bafybeicykacvkkyqfgngqc4dtqfdi3dhs4ukv4bdugl2ny6u7gyffb5mf4",
                    "size": 1065964,
                    "sizeBigInt": 1065964,
                    "extension": "js",
                    "createdAt": "2024-08-06T18:56:52.818Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzis66eo00083a77owfefgyx",
                    "cid": "bafybeidevzcimw63kfjvvg3pi5hw6s723zsdfdzaeznxmmctdjizu3n6li",
                    "size": 1066007,
                    "sizeBigInt": 1066007,
                    "extension": "js",
                    "createdAt": "2024-08-06T18:55:36.387Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzis3v1l0005xnqh5migm5va",
                    "cid": "bafybeihpauvhso2ovhwpyiuuap5hjbw7m6licfcy2vezlorddtbqzgxbfm",
                    "size": 1066004,
                    "sizeBigInt": 1066004,
                    "extension": "js",
                    "createdAt": "2024-08-06T18:53:48.344Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzis1b6t00053a77gmf91ywa",
                    "cid": "bafybeicdn27hylby2om2vjohcd3p6gw2wiikogoptoldhasv4ny2ykibti",
                    "size": 1065966,
                    "sizeBigInt": 1065966,
                    "extension": "js",
                    "createdAt": "2024-08-06T18:51:49.311Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzirw4kl0002hm59d1ov6wfk",
                    "cid": "bafybeieiry2w6yklnyp46fzuxm7wxiyy7hocnou7vhhz5ua42n7xvdqsju",
                    "size": 1066002,
                    "sizeBigInt": 1066002,
                    "extension": "js",
                    "createdAt": "2024-08-06T18:47:47.281Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzipixab0005cwlc8px15xx8",
                    "cid": "bafkreib5guhdctwip4qcbievwz5bt5ymunmm7z6igl4bto64m6v5ef7ya4",
                    "size": 1779,
                    "sizeBigInt": 1779,
                    "extension": "js",
                    "createdAt": "2024-08-06T17:41:32.247Z",
                    "filename": "6aug2k241758",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzipdkhj000514j1qxbdjsw9",
                    "cid": "bafkreieixuawnskrasnu7qkx7wsonnnvt2ypm7mba6t4mu375rxzwjfcwm",
                    "size": 1787,
                    "sizeBigInt": 1787,
                    "extension": "js",
                    "createdAt": "2024-08-06T17:37:22.386Z",
                    "filename": "6aug2k241758",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzh1xfnz00aw123g88aev67d",
                    "cid": "bafkreig2z4elqzkcdhqhsxpbkfhcphrp3ortde3zybawcc7dycw6pjtyu4",
                    "size": 355,
                    "sizeBigInt": 355,
                    "extension": "js",
                    "createdAt": "2024-08-05T13:53:12.292Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzh1w3qe00c5zeh03g56uoti",
                    "cid": "bafkreiembu7if45aqrvq7zk67piqrora6hhyma65wcb3waay6y3fv6u33i",
                    "size": 451,
                    "sizeBigInt": 451,
                    "extension": "js",
                    "createdAt": "2024-08-05T13:52:10.179Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzcti787002z12347vf679wp",
                    "cid": "bafkreiapyu3ncxq734knkszgpvdvbxebgcadgakmjtluydikwrmkfjrtru",
                    "size": 915734,
                    "sizeBigInt": 915734,
                    "extension": "js",
                    "createdAt": "2024-08-02T14:46:19.889Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzcs78oa002qrt568jl5ag2h",
                    "cid": "bafkreihznfsohic3gzrrwnzhqa3xnoj6psldflirzojmyksq6fhfh252ea",
                    "size": 915770,
                    "sizeBigInt": 915770,
                    "extension": "js",
                    "createdAt": "2024-08-02T14:09:48.932Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzcs0lvv002nrt567cbsflk4",
                    "cid": "bafkreib2mza7q25hnkfc7hu6inygzllwtcqq6lweeox4crqr2gmtjg75om",
                    "size": 915782,
                    "sizeBigInt": 915782,
                    "extension": "js",
                    "createdAt": "2024-08-02T14:04:39.453Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzcrx56c002q1234tpspwvdi",
                    "cid": "bafkreigq2vseewiaepehlssnem4brfq3aya6vxel3ginyehoafqipd2mcu",
                    "size": 915757,
                    "sizeBigInt": 915757,
                    "extension": "js",
                    "createdAt": "2024-08-02T14:01:57.822Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzcrv5du002nj0lzm7vmnwjr",
                    "cid": "bafkreih3xjtjk2snsv6sgf54tbxhpu3aot4tdl65plod3fy4bhxkgdunfa",
                    "size": 915817,
                    "sizeBigInt": 915817,
                    "extension": "js",
                    "createdAt": "2024-08-02T14:00:24.801Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                },
                {
                    "__typename": "Pin",
                    "id": "clzcrpzom002kj0lznwlg8gem",
                    "cid": "bafkreicdilmvz6g5zqeqmfsos653cjuwbkm74g4tkkgo3abwbfqg5x3pnm",
                    "size": 915823,
                    "sizeBigInt": 915823,
                    "extension": "js",
                    "createdAt": "2024-08-02T13:56:24.131Z",
                    "filename": "function",
                    "storedOnArweave": false,
                    "storedOnFilecoin": true,
                    "pathInFolder": null,
                    "arweavePin": null,
                    "filecoinPin": null
                }
            ]
        }
    }
};

export const templates = {
    "data": {
        "templates": {
            "__typename": "TemplatesWithAggregation",
            "currentPage": 1,
            "nextPage": 2,
            "isLastPage": false,
            "totalCount": 23,
            "data": [
                {
                    "__typename": "Template",
                    "id": "clmf7io4a0009ic08ya3sjwyj",
                    "name": "Astro Template",
                    "description": "Boilerplate for building sites in Astro and deploying them using Fleek. Output directory set to `dist` and build command to `pnpm install && pnpm run build`.",
                    "usageCount": 110,
                    "siteId": "clpmqqkz200002v3715jcs32m",
                    "siteAvatar": null,
                    "siteSlug": "shrilling-zoo-flat",
                    "reviewStatus": "APPROVED",
                    "reviewComment": null,
                    "createdAt": "2023-09-11T18:17:58.426Z",
                    "updatedAt": "2025-02-07T14:17:22.584Z",
                    "banner": "https://assets.stg.on-fleek-test.app/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbVJBWG5QS0gyY1pkVlJITHNORFUyY2RFMllRWjFvcTVBWnVUbTlIb2hEcHo2IiwiZXhwIjoxNzM4OTUyNzgwfQ.hPV-C11iRM5hybhIHVbY24n63YryDOhk_vRgE0ZhuCk",
                    "deployment": {
                        "__typename": "Deployment",
                        "id": "clpmqqlq000042v37uf16823t",
                        "previewImageUrl": "https://sites-preview-staging.s3.us-west-2.amazonaws.com/gcOo7fcb6eNwLgPxoLZo",
                        "sourceRepositoryOwner": "fleekxyz"
                    },
                    "framework": {
                        "__typename": "SiteFramework",
                        "id": "clpmqipx1000dut7nn8xqowl9",
                        "name": "Astro",
                        "avatar": "https://assets.stg.on-fleek-test.app/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJiYWZ5YmVpYjU1MmdmY2xjemI0N2lncWFlcHppdWhnN2EyaG50cHR4N2l4d2RreWFmcXl4bHkyMjZyNCIsImV4cCI6MTczODk1Mjc4MH0.ULA1FH1t3kkeTxFBv3lrxTpsnaJWmgh5MtFt6T7FNQY"
                    },
                    "category": {
                        "__typename": "TemplateCategory",
                        "id": "clmexkjhc0001ih0o0thwjozz",
                        "name": "Bootstrap",
                        "slug": "bootstrap"
                    },
                    "creator": {
                        "__typename": "User",
                        "id": "clhezponv0000mp08fmkc0jzo",
                        "username": "fleekxyz",
                        "avatar": "https://assets.stg.on-fleek-test.app/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbWVaSFZZaWlMekplMkpGaEhMUWlYNG9UTGVCZkVmUjk0aDlBRXo5Wmk4eEpHIiwiZXhwIjoxNzM4OTUyNzgwfQ.kfcxl4wMl8lFqUw118NcsDp8LWR5AJS6TS1wIs5qtrU"
                    }
                },
                {
                    "__typename": "Template",
                    "id": "clqe3ucmc000bl108csc2xx3r",
                    "name": "Astro_template",
                    "description": "A template for astro development",
                    "usageCount": 8,
                    "siteId": "clqe3ozfh0005l108a90xfnrc",
                    "siteAvatar": null,
                    "siteSlug": "substantial-computer-faint",
                    "reviewStatus": "APPROVED",
                    "reviewComment": "Evaluation Issues: repository score is too low: 0",
                    "createdAt": "2023-12-20T18:26:08.100Z",
                    "updatedAt": "2024-04-22T18:56:16.260Z",
                    "banner": "https://assets.stg.on-fleek-test.app/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbVpBWnpCWTJ1eUVNTHFrV04zNG9OTFhqcm9ieGNGVjJUY1A0VVFmeEpwNTRoIiwiZXhwIjoxNzM4OTUyNzgwfQ.TbW21-_r4FgNZOHMxkIVTQ4CFUMJoq8Qb2ZSmqmNgYY",
                    "deployment": {
                        "__typename": "Deployment",
                        "id": "clqe3p0780009l108r8ypshl3",
                        "previewImageUrl": "https://sites-preview-staging.s3.us-west-2.amazonaws.com/pZZ5J0JrNB40MDs8TqnB",
                        "sourceRepositoryOwner": "inky-penky"
                    },
                    "framework": {
                        "__typename": "SiteFramework",
                        "id": "clpmqipx1000dut7nn8xqowl9",
                        "name": "Astro",
                        "avatar": "https://assets.stg.on-fleek-test.app/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJiYWZ5YmVpYjU1MmdmY2xjemI0N2lncWFlcHppdWhnN2EyaG50cHR4N2l4d2RreWFmcXl4bHkyMjZyNCIsImV4cCI6MTczODk1Mjc4MH0.ULA1FH1t3kkeTxFBv3lrxTpsnaJWmgh5MtFt6T7FNQY"
                    },
                    "category": {
                        "__typename": "TemplateCategory",
                        "id": "clmexl0k40002ih0oqy21z4c7",
                        "name": "Portfolio",
                        "slug": "portfolio"
                    },
                    "creator": {
                        "__typename": "User",
                        "id": "clq3yovin0006l308extr81s8",
                        "username": "Ahmad",
                        "avatar": "https://assets.stg.on-fleek-test.app/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbVZoNWFnRlZkeXI0M1pDN1BMVHk2UVdNbzZRcWpIQWVDWUtzTnZ0ekR6TGE2IiwiZXhwIjoxNzM4OTUyNzgwfQ.1i-UTG7En-E-oT6g2rCLsJyM5ax3aPMzyRM4-NeAxps"
                    }
                },
                {
                    "__typename": "Template",
                    "id": "clvb4amgn0008l508ll6ry25m",
                    "name": "Black Jack by Cyrus",
                    "description": "A mini black jack game by cyrus",
                    "usageCount": 8,
                    "siteId": "clvb3u7to0000l008vpek1ht9",
                    "siteAvatar": null,
                    "siteSlug": "limited-dinner-loud",
                    "reviewStatus": "APPROVED",
                    "reviewComment": "Evaluation Issues: repository score is too low: 1, repository readme is too short: 0 characters",
                    "createdAt": "2024-04-22T15:34:00.503Z",
                    "updatedAt": "2024-09-08T19:06:57.809Z",
                    "framework": null,
                    "banner": "https://assets.stg.on-fleek-test.app/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbVp2bUdlQllQTmpWU0xGOFNTZDNmNE5CZHJxUDJwbWdKY0J3c2RWZ3AzbWpUIiwiZXhwIjoxNzM4OTUyNzgwfQ.jtky-Vk8JFjvT524U1tYOL3IymB9uQ41OOU7vNwR1bc",
                    "deployment": {
                        "__typename": "Deployment",
                        "id": "clvb3u8wa0004l008rijg5pb5",
                        "previewImageUrl": "https://sites-preview-staging.s3.us-west-2.amazonaws.com/w0Wy04Mx0XAKJmW_ncU5",
                        "sourceRepositoryOwner": "inky-penky"
                    },
                    "category": {
                        "__typename": "TemplateCategory",
                        "id": "clmexkjhc0001ih0o0thwjozz",
                        "name": "Bootstrap",
                        "slug": "bootstrap"
                    },
                    "creator": {
                        "__typename": "User",
                        "id": "clvb3ldar0000jo09vklllnvs",
                        "username": "fleek+2",
                        "avatar": "https://assets.stg.on-fleek-test.app/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbU5RWno4MkJzYjVTeGtSMVAxbU5SSjdMSFBrZHdFaFQ0UDYxZFl3UFM2RENrIiwiZXhwIjoxNzM4OTUyNzgwfQ.KpoLvJc3onY1w54_osqWTv6jlVRYz4q0SB2As9Ixi4w"
                    }
                }
            ]
        }
    }
};

export const sites = {
    "data": {
        "sites": {
            "__typename": "SitesWithAggregation",
            "pageCount": 1,
            "totalCount": 5,
            "data": [
                {
                    "__typename": "Site",
                    "id": "cm0qsgsd8000ar2pac2e886tt",
                    "avatar": null,
                    "name": "fri6sep15052k24",
                    "slug": "skinny-france-howling",
                    "zones": [],
                    "sourceProvider": null,
                    "sourceRepositoryId": null,
                    "sourceRepositoryOwner": null,
                    "sourceRepositoryName": null,
                    "sourceBranch": null,
                    "githubInstallationId": null,
                    "enablePreviews": true,
                    "deployOnBranchUpdate": true,
                    "baseDirectory": null,
                    "buildCommand": null,
                    "distDirectory": null,
                    "dockerImage": null,
                    "cpuLimit": null,
                    "memoryLimit": null,
                    "buildDurationLimitSeconds": null,
                    "currentDeployment": null,
                    "primaryDomain": null,
                    "domains": [],
                    "ipnsRecords": [],
                    "lastDeployment": null
                },
                {
                    "__typename": "Site",
                    "id": "clyejrhe30006xlbpqy6d4xl4",
                    "avatar": null,
                    "name": "test202407091609",
                    "slug": "many-rainbow-squeaking",
                    "zones": [],
                    "sourceProvider": null,
                    "sourceRepositoryId": null,
                    "sourceRepositoryOwner": null,
                    "sourceRepositoryName": null,
                    "sourceBranch": null,
                    "githubInstallationId": null,
                    "enablePreviews": true,
                    "deployOnBranchUpdate": true,
                    "baseDirectory": null,
                    "buildCommand": null,
                    "distDirectory": null,
                    "dockerImage": null,
                    "cpuLimit": null,
                    "memoryLimit": null,
                    "buildDurationLimitSeconds": null,
                    "currentDeployment": null,
                    "ipnsRecords": [],
                    "domains": [],
                    "primaryDomain": null,
                    "lastDeployment": null
                },
                {
                    "__typename": "Site",
                    "id": "clyejq8540003xlbp6o0f6s7a",
                    "avatar": null,
                    "name": "temp202407091608",
                    "slug": "thundering-china-quiet",
                    "zones": [],
                    "sourceProvider": null,
                    "sourceRepositoryId": null,
                    "sourceRepositoryOwner": null,
                    "sourceRepositoryName": null,
                    "sourceBranch": null,
                    "githubInstallationId": null,
                    "enablePreviews": true,
                    "deployOnBranchUpdate": true,
                    "baseDirectory": null,
                    "buildCommand": null,
                    "distDirectory": null,
                    "dockerImage": null,
                    "cpuLimit": null,
                    "memoryLimit": null,
                    "buildDurationLimitSeconds": null,
                    "currentDeployment": null,
                    "ipnsRecords": [],
                    "domains": [],
                    "primaryDomain": null,
                    "lastDeployment": null
                },
                {
                    "__typename": "Site",
                    "id": "clyejlrdx0000xlbp9622pfw3",
                    "avatar": null,
                    "name": "test202407091604",
                    "slug": "many-morning-substantial",
                    "zones": [],
                    "sourceProvider": null,
                    "sourceRepositoryId": null,
                    "sourceRepositoryOwner": null,
                    "sourceRepositoryName": null,
                    "sourceBranch": null,
                    "githubInstallationId": null,
                    "enablePreviews": true,
                    "deployOnBranchUpdate": true,
                    "baseDirectory": null,
                    "buildCommand": null,
                    "distDirectory": null,
                    "dockerImage": null,
                    "cpuLimit": null,
                    "memoryLimit": null,
                    "buildDurationLimitSeconds": null,
                    "currentDeployment": null,
                    "ipnsRecords": [],
                    "domains": [],
                    "primaryDomain": null,
                    "lastDeployment": null
                },
                {
                    "__typename": "Site",
                    "id": "clsyks1cw0003l2084wve4ggn",
                    "avatar": null,
                    "name": "Yoplay",
                    "slug": "scarce-argument-steep",
                    "sourceProvider": null,
                    "sourceRepositoryId": null,
                    "sourceRepositoryOwner": null,
                    "sourceRepositoryName": null,
                    "sourceBranch": null,
                    "githubInstallationId": null,
                    "enablePreviews": true,
                    "deployOnBranchUpdate": true,
                    "baseDirectory": null,
                    "buildCommand": null,
                    "distDirectory": null,
                    "dockerImage": null,
                    "cpuLimit": null,
                    "memoryLimit": null,
                    "buildDurationLimitSeconds": null,
                    "zones": [
                        {
                            "__typename": "SiteZone",
                            "id": "clsyl4001000al308jndqrkxg",
                            "status": "CREATED"
                        }
                    ],
                    "primaryDomain": {
                        "__typename": "Domain",
                        "id": "clsyn6wl70005l508jueb03dd",
                        "hostname": "yoplay.dropbeat.co",
                        "isVerified": true
                    },
                    "lastDeployment": {
                        "__typename": "Deployment",
                        "cid": "bafybeihruw7odifcsphwnkw3hclvnjimn6c2uroq4crmt6flrmpgmekz2a",
                        "id": "clsyte4t70005l108wotbvx6q",
                        "siteId": "clsyks1cw0003l2084wve4ggn",
                        "status": "RELEASE_COMPLETED",
                        "createdAt": "2024-02-23T15:36:09.691Z",
                        "sourceProvider": null,
                        "sourceAuthor": null,
                        "sourceMessage": null,
                        "sourceRepositoryName": null,
                        "sourceRepositoryOwner": null,
                        "previewImageUrl": "https://sites-preview-staging.s3.us-west-2.amazonaws.com/5K0-I5_WDbwQ9zrEPRIj",
                        "previewOnly": false,
                        "storageType": "IPFS",
                        "sourceBranch": null,
                        "updatedAt": "2024-02-23T15:36:48.932Z",
                        "sourceRef": null
                    },
                    "currentDeployment": {
                        "__typename": "Deployment",
                        "cid": "bafybeihruw7odifcsphwnkw3hclvnjimn6c2uroq4crmt6flrmpgmekz2a",
                        "id": "clsyte4t70005l108wotbvx6q",
                        "status": "RELEASE_COMPLETED",
                        "createdAt": "2024-02-23T15:36:09.691Z",
                        "sourceProvider": null,
                        "sourceAuthor": null,
                        "sourceMessage": null,
                        "sourceRepositoryName": null,
                        "sourceRepositoryOwner": null,
                        "previewImageUrl": "https://sites-preview-staging.s3.us-west-2.amazonaws.com/5K0-I5_WDbwQ9zrEPRIj",
                        "previewOnly": false,
                        "storageType": "IPFS",
                        "sourceBranch": null,
                        "updatedAt": "2024-02-23T15:36:48.932Z",
                        "sourceRef": null,
                        "functionDeployments": []
                    },
                    "ipnsRecords": [
                        {
                            "__typename": "IpnsRecord",
                            "id": "clxkm6mse0001l3b43bcqxjn3",
                            "hash": "bafybeihruw7odifcsphwnkw3hclvnjimn6c2uroq4crmt6flrmpgmekz2a",
                            "name": "k51qzi5uqu5dhtf7lahcczdx8jac3xn61p92r4ohjwvlai2znm1yiqxuiflrkd",
                            "ensRecords": []
                        }
                    ],
                    "domains": [
                        {
                            "__typename": "Domain",
                            "id": "clsyn6wl70005l508jueb03dd",
                            "hostname": "yoplay.dropbeat.co",
                            "status": "ACTIVE",
                            "errorMessage": null,
                            "isVerified": true,
                            "createdAt": "2024-02-23T12:42:34.748Z",
                            "updatedAt": "2024-02-23T12:48:52.557Z",
                            "dnslinkStatus": null,
                            "dnsConfigs": [
                                {
                                    "__typename": "DnsConfig",
                                    "createdAt": "2024-02-23T12:42:35.320Z",
                                    "id": "clsyn6x130001jt084u8f6gro",
                                    "name": "hostname",
                                    "type": "CNAME",
                                    "updatedAt": "2024-02-23T12:42:35.320Z",
                                    "value": "https://clsyl4001000al308jndqrkxg.b-cdn.net"
                                }
                            ],
                            "zone": {
                                "__typename": "Zone",
                                "id": "clsyl4001000al308jndqrkxg"
                            }
                        },
                        {
                            "__typename": "Domain",
                            "id": "clwqfef0m000111qehicui9re",
                            "hostname": "28may2k241421.dropband.co",
                            "status": "CREATED",
                            "errorMessage": null,
                            "isVerified": false,
                            "createdAt": "2024-05-28T13:21:08.230Z",
                            "updatedAt": "2024-05-28T13:21:11.476Z",
                            "dnslinkStatus": null,
                            "dnsConfigs": [
                                {
                                    "__typename": "DnsConfig",
                                    "createdAt": "2024-05-28T13:21:11.476Z",
                                    "id": "clwqfehis0000crt5iqa6k16q",
                                    "name": "hostname",
                                    "type": "CNAME",
                                    "updatedAt": "2024-05-28T13:21:11.476Z",
                                    "value": "https://clsyl4001000al308jndqrkxg.b-cdn.net"
                                }
                            ],
                            "zone": {
                                "__typename": "Zone",
                                "id": "clsyl4001000al308jndqrkxg"
                            }
                        },
                        {
                            "__typename": "Domain",
                            "id": "clwqqj39i0001o46od4dytfpa",
                            "hostname": "28may2k241932.dropband.co",
                            "status": "VERIFYING_FAILED",
                            "errorMessage": "The domain 28may2k241932.dropband.co is not pointing to our servers.",
                            "isVerified": false,
                            "createdAt": "2024-05-28T18:32:42.054Z",
                            "updatedAt": "2024-06-18T15:23:01.555Z",
                            "dnslinkStatus": null,
                            "dnsConfigs": [
                                {
                                    "__typename": "DnsConfig",
                                    "createdAt": "2024-05-28T18:32:45.019Z",
                                    "id": "clwqqj5jv000020xod2tnur02",
                                    "name": "hostname",
                                    "type": "CNAME",
                                    "updatedAt": "2024-05-28T18:32:45.019Z",
                                    "value": "https://clsyl4001000al308jndqrkxg.b-cdn.net"
                                }
                            ],
                            "zone": {
                                "__typename": "Zone",
                                "id": "clsyl4001000al308jndqrkxg"
                            }
                        },
                        {
                            "__typename": "Domain",
                            "id": "clxklpx4h0001p2dlq0a3bxei",
                            "hostname": "yoplay.com",
                            "status": "CREATING_FAILED",
                            "errorMessage": "The domain yoplay.com cannot be registered.",
                            "isVerified": false,
                            "createdAt": "2024-06-18T16:11:07.889Z",
                            "updatedAt": "2024-06-18T16:12:08.694Z",
                            "dnslinkStatus": null,
                            "dnsConfigs": [],
                            "zone": {
                                "__typename": "Zone",
                                "id": "clsyl4001000al308jndqrkxg"
                            }
                        }
                    ]
                }
            ]
        }
    }
};

export const version = {
    "data": {
        "version": {
            "__typename": "Version",
            "commitHash": "b1929830643082830ef91e1ab4a876467c406a45"
        }
    }
};

export const protectedActions = {
    "data": {
        "twoFactorProtectedActions": {
            "__typename": "TwoFactorProtectedActionsWithAggregation",
            "data": [
                {
                    "__typename": "TwoFactorProtectedAction",
                    "id": "cly7fofmr000114ogwx37lejm",
                    "type": "DELETE_PROJECT",
                    "name": "Delete Project",
                    "enabled": false
                },
                {
                    "__typename": "TwoFactorProtectedAction",
                    "id": "cly7fof9e000014og427z20jh",
                    "type": "DELETE_SITE",
                    "name": "Delete Site",
                    "enabled": false
                },
                {
                    "__typename": "TwoFactorProtectedAction",
                    "id": "cly7fog67000314ogcqvfvye1",
                    "type": "DELETE_USER",
                    "name": "Delete User",
                    "enabled": false
                },
                {
                    "__typename": "TwoFactorProtectedAction",
                    "id": "cly7fofwf000214ogut2gn713",
                    "type": "INVITE_MEMBER",
                    "name": "Invite Member",
                    "enabled": false
                }
            ]
        }
    }
};

export const privateGateways = {
    "data": {
        "privateGateways": {
            "__typename": "PrivateGatewaysWithAggregation",
            "data": [
                {
                    "__typename": "PrivateGateway",
                    "id": "clst3i5jk0007l108d4ml1x4q",
                    "name": "suuuu",
                    "createdAt": "2024-02-19T15:32:36.369Z",
                    "domains": [],
                    "primaryDomain": {
                        "__typename": "Domain",
                        "id": "clsyom3yw000hl408pkmxdwpm",
                        "hostname": "privategateway.dropbeat.co",
                        "isVerified": true
                    },
                    "zone": {
                        "__typename": "Zone",
                        "id": "clst3hznw0005l108jz4dait9"
                    }
                },
                {
                    "__typename": "PrivateGateway",
                    "id": "clsyoj5de000fl4080cae2ygj",
                    "name": "yoplay",
                    "createdAt": "2024-02-23T13:20:05.619Z",
                    "primaryDomain": {
                        "__typename": "Domain",
                        "id": "clsyom3yw000hl408pkmxdwpm",
                        "hostname": "privategateway.dropbeat.co",
                        "isVerified": true
                    },
                    "zone": {
                        "__typename": "Zone",
                        "id": "clsyoizfc000dl408afmh4pbw"
                    },
                    "domains": [
                        {
                            "__typename": "Domain",
                            "id": "clsyom3yw000hl408pkmxdwpm",
                            "hostname": "privategateway.dropbeat.co",
                            "status": "ACTIVE",
                            "errorMessage": null,
                            "isVerified": true,
                            "createdAt": "2024-02-23T13:22:23.768Z",
                            "updatedAt": "2024-02-23T13:23:24.611Z",
                            "dnsConfigs": [
                                {
                                    "__typename": "DnsConfig",
                                    "createdAt": "2024-02-23T13:22:28.309Z",
                                    "id": "clsyom7h10000li0814lm6b2w",
                                    "name": "hostname",
                                    "type": "CNAME",
                                    "updatedAt": "2024-02-23T13:22:28.309Z",
                                    "value": "clsyoizfc000dl408afmh4pbw.fleekcdn.xyz"
                                }
                            ],
                            "zone": {
                                "__typename": "Zone",
                                "id": "clsyoizfc000dl408afmh4pbw"
                            }
                        }
                    ]
                },
                {
                    "__typename": "PrivateGateway",
                    "id": "cltcxsw320005ju08d43jbmlz",
                    "name": "sosi",
                    "createdAt": "2024-03-04T12:48:23.150Z",
                    "primaryDomain": {
                        "__typename": "Domain",
                        "id": "clsyom3yw000hl408pkmxdwpm",
                        "hostname": "privategateway.dropbeat.co",
                        "isVerified": true
                    },
                    "zone": {
                        "__typename": "Zone",
                        "id": "cltcxspv50003ju08pu4wizon"
                    },
                    "domains": [
                        {
                            "__typename": "Domain",
                            "id": "cltcxt14a0007ju0869t26lww",
                            "hostname": "sosi.cc",
                            "status": "CREATING_FAILED",
                            "errorMessage": "The hostname is already registered.",
                            "isVerified": false,
                            "createdAt": "2024-03-04T12:48:29.675Z",
                            "updatedAt": "2024-03-04T12:49:30.185Z",
                            "dnsConfigs": [],
                            "zone": {
                                "__typename": "Zone",
                                "id": "cltcxspv50003ju08pu4wizon"
                            }
                        }
                    ]
                },
                {
                    "__typename": "PrivateGateway",
                    "id": "cltcy818z000hl1082ixapywu",
                    "name": "mimi",
                    "createdAt": "2024-03-04T13:00:09.684Z",
                    "primaryDomain": {
                        "__typename": "Domain",
                        "id": "clsyom3yw000hl408pkmxdwpm",
                        "hostname": "privategateway.dropbeat.co",
                        "isVerified": true
                    },
                    "zone": {
                        "__typename": "Zone",
                        "id": "cltcy7vbp000fl108mbgmgxh6"
                    },
                    "domains": [
                        {
                            "__typename": "Domain",
                            "id": "cltcy86zt000jl108ge73e2br",
                            "hostname": "gw-test-1.dropbeat.co",
                            "status": "CREATING_FAILED",
                            "errorMessage": "The hostname is already registered.",
                            "isVerified": false,
                            "createdAt": "2024-03-04T13:00:17.129Z",
                            "updatedAt": "2024-03-04T13:01:18.291Z",
                            "dnsConfigs": [],
                            "zone": {
                                "__typename": "Zone",
                                "id": "cltcy7vbp000fl108mbgmgxh6"
                            }
                        }
                    ]
                },
                {
                    "__typename": "PrivateGateway",
                    "id": "cltcz3uoe0003l4081g4n2d9j",
                    "name": "flipart-test-2",
                    "createdAt": "2024-03-04T13:24:54.159Z",
                    "primaryDomain": {
                        "__typename": "Domain",
                        "id": "clsyom3yw000hl408pkmxdwpm",
                        "hostname": "privategateway.dropbeat.co",
                        "isVerified": true
                    },
                    "zone": {
                        "__typename": "Zone",
                        "id": "cltcz3owi0001l408qap8dxc2"
                    },
                    "domains": []
                },
                {
                    "__typename": "PrivateGateway",
                    "id": "cltczthfq0003jr08a783tryc",
                    "name": "flipart202403041344",
                    "createdAt": "2024-03-04T13:44:50.054Z",
                    "primaryDomain": {
                        "__typename": "Domain",
                        "id": "clsyom3yw000hl408pkmxdwpm",
                        "hostname": "privategateway.dropbeat.co",
                        "isVerified": true
                    },
                    "zone": {
                        "__typename": "Zone",
                        "id": "cltcztbc00001jr08bp3iqogz"
                    },
                    "domains": [
                        {
                            "__typename": "Domain",
                            "id": "cltczu3t70005jr08txojrmff",
                            "hostname": "flipart202403041344.flipart.co.uk",
                            "status": "CREATING_FAILED",
                            "errorMessage": "The hostname is already registered.",
                            "isVerified": false,
                            "createdAt": "2024-03-04T13:45:19.051Z",
                            "updatedAt": "2024-03-04T13:46:19.615Z",
                            "dnsConfigs": [],
                            "zone": {
                                "__typename": "Zone",
                                "id": "cltcztbc00001jr08bp3iqogz"
                            }
                        }
                    ]
                }
            ]
        }
    }
};

export const domainStatus = {
    "data": {
        "domain": {
            "__typename": "Domain",
            "id": "cltcxt14a0007ju0869t26lww",
            "status": "CREATING_FAILED",
            "errorMessage": "The hostname is already registered.",
            "dnsConfigs": []
        }
    }
};

export const applications = {
    "data": {
        "applications": {
            "__typename": "ApplicationsWithAggregation",
            "data": [
                {
                    "__typename": "Application",
                    "clientId": "client_merCEQdEt9LpM1qvGEJM",
                    "createdAt": "2024-02-19T13:42:22.695Z",
                    "id": "clsszkeef0001jn082sf0dvul",
                    "name": "My application",
                    "updatedAt": "2024-10-28T10:36:14.428Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "test.co.uk"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "test.co.uk"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_wVAQwRZjlJjV_mS57Nl_",
                    "createdAt": "2024-03-20T18:07:25.454Z",
                    "id": "clu048t1q0003l908i08w9ent",
                    "name": "stg202403201807",
                    "updatedAt": "2024-03-20T18:07:25.454Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403201807.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403201807.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_YWROS6SetKaXKNUuR_TQ",
                    "createdAt": "2024-03-20T19:48:35.575Z",
                    "id": "clu07uws60001jp085kdvqeke",
                    "name": "stg202403201948nowhitelist",
                    "updatedAt": "2024-03-20T19:48:35.575Z",
                    "whitelistDomains": [],
                    "whiteLabelDomains": []
                },
                {
                    "__typename": "Application",
                    "clientId": "client_a3hbU1foa-r1WU0EbuYU",
                    "createdAt": "2024-03-21T00:00:56.050Z",
                    "id": "clu0gvf8y0003jt086g7do7ba",
                    "name": "replit",
                    "updatedAt": "2024-03-21T00:00:56.050Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "replit.com"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "replit.com"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_pLWJrJXZbcSSuDEFLXBW",
                    "createdAt": "2024-03-21T00:42:42.092Z",
                    "id": "clu0id4x80001i7081fv1mjic",
                    "name": "stg202403210042nowhitelist",
                    "updatedAt": "2024-03-21T00:42:42.092Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403210042nowhitelist.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403210042nowhitelist.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_K4OIGbG8bePLDXH5-1CW",
                    "createdAt": "2024-03-21T16:42:03.514Z",
                    "id": "clu1gmvll0001jm08vlq2vlo7",
                    "name": "stg202403211641",
                    "updatedAt": "2024-03-21T16:42:03.514Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211641.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211641.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_CtCg6Yf3zl4NwyD7Scgm",
                    "createdAt": "2024-03-21T16:44:37.533Z",
                    "id": "clu1gq6fx0005jm08okdmd8pe",
                    "name": "stg202403211644on073",
                    "updatedAt": "2024-03-21T16:44:37.533Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211644on073.punkbit.com"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211644on073.punkbit.com"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_H6hGyxTygxb37P6Ifqzr",
                    "createdAt": "2024-03-21T17:16:57.626Z",
                    "id": "clu1hvrfd0001l8089juhagaq",
                    "name": "stg202403211716",
                    "updatedAt": "2024-03-21T17:16:57.626Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211716.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211716.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_a8PSClEuVU40zmajaEK3",
                    "createdAt": "2024-03-21T17:30:31.621Z",
                    "id": "clu1id7ih0001l908u74kap1c",
                    "name": "stg202403211730",
                    "updatedAt": "2024-03-21T17:30:31.621Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211730.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211730.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_Gdt4MhOU3OXu5b0388-v",
                    "createdAt": "2024-03-21T17:55:20.991Z",
                    "id": "clu1j94pu0001l508cv6anp7k",
                    "name": "hgghjgh",
                    "updatedAt": "2024-03-21T17:55:20.991Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "hgjgjh.hjjh.cc"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "hgjgjh.hjjh.cc"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_dsfJPbGorSC24O_w9mHC",
                    "createdAt": "2024-03-21T18:00:16.140Z",
                    "id": "clu1jfggc0005l5084sw2pko1",
                    "name": "cli073.1",
                    "updatedAt": "2024-03-21T18:00:16.140Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "cli073.1.com"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "cli073.1.com"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_Hz87sN2saluNiSapClOS",
                    "createdAt": "2024-03-21T18:02:46.306Z",
                    "id": "clu1jiobm0003l7084pwvifvq",
                    "name": "cli073c",
                    "updatedAt": "2024-03-21T18:02:46.306Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "cli073c.com"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "cli073c.com"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_1SnOHkCtwVIkE_8f16IU",
                    "createdAt": "2024-03-21T18:30:12.287Z",
                    "id": "clu1khyda0003k208us5h6jqm",
                    "name": "stg202403211830",
                    "updatedAt": "2024-03-21T18:30:12.287Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211830.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211830.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_3BlI5OniFVzmFzmEql7p",
                    "createdAt": "2024-03-21T18:31:35.610Z",
                    "id": "clu1kjqnu0001jz0897p7mlaw",
                    "name": "stg202403211831",
                    "updatedAt": "2024-03-21T18:31:35.610Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211831.punkbit.com"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211831.punkbit.com"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_LIVAY2ZQ50JHYnX2ScGK",
                    "createdAt": "2024-03-21T19:20:47.967Z",
                    "id": "clu1mb0pr0001kz08e253cwfv",
                    "name": "stg202403211920",
                    "updatedAt": "2024-03-21T19:20:47.967Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211920.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211920.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_BmDm-QJnMGCs5O0Wf0xc",
                    "createdAt": "2024-03-21T19:21:57.927Z",
                    "id": "clu1mcip20005kz08dl4ozb87",
                    "name": "stg202403211921",
                    "updatedAt": "2024-03-21T19:21:57.927Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211921.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211921.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_JV1xroEK9594kwRwRkDC",
                    "createdAt": "2024-03-21T19:23:04.041Z",
                    "id": "clu1mdxpk0001l508p07grpqd",
                    "name": "stg202403211923",
                    "updatedAt": "2024-03-21T19:23:04.041Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211923.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211923.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_Ml0M7GCYLErRDq5mKj3n",
                    "createdAt": "2024-03-21T19:23:52.112Z",
                    "id": "clu1meysv0005l50841w4cen0",
                    "name": "stg202403211924",
                    "updatedAt": "2024-03-21T19:23:52.112Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211924.dropbeat.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211924.dropbeat.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_4ZvHW-pKA896S18RxgOB",
                    "createdAt": "2024-03-21T19:25:45.711Z",
                    "id": "clu1mhege0009l508mpo66x0f",
                    "name": "stg202403211925",
                    "updatedAt": "2024-03-21T19:25:45.711Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211925.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211925.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_yIOdsPpBBOPesbKBkgh9",
                    "createdAt": "2024-03-21T19:35:38.955Z",
                    "id": "clu1mu47f000dl508z56w0ow8",
                    "name": "stg202403220936updt",
                    "updatedAt": "2024-03-22T09:36:50.411Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211935.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211935.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_wjjlyNurEnzenARx8fs8",
                    "createdAt": "2024-03-21T19:52:15.774Z",
                    "id": "clu1nfhct0001ky08wo3127tl",
                    "name": "stg202403220907on073",
                    "updatedAt": "2024-03-22T09:08:41.036Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403220907on073.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403220907on073.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_vpPlBjSZcxfkDqrRZ1Ef",
                    "createdAt": "2024-03-21T19:52:58.591Z",
                    "id": "clu1ngee70005ky08hxsf50gg",
                    "name": "stg202403211952cli073",
                    "updatedAt": "2024-03-21T19:52:58.591Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403211952cli073.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403211952cli073.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_8DrDYRvC6DhZ2jYrS29T",
                    "createdAt": "2024-03-22T09:35:15.080Z",
                    "id": "clu2gtuo80001jv088l1a45vm",
                    "name": "stg2024030934updt",
                    "updatedAt": "2024-03-22T09:36:18.973Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg2024030934.dropband.co"
                        },
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg2024030934.punkbit.com"
                        },
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg2024030934.dropbeat.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg2024030934.dropband.co"
                        },
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg2024030934.punkbit.com"
                        },
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg2024030934.dropbeat.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_Njad4CptNvXiLbLmfIAb",
                    "createdAt": "2024-03-22T09:35:51.423Z",
                    "id": "clu2gumpr0009jv08e13hd7a5",
                    "name": "stg202403220935on073",
                    "updatedAt": "2024-03-22T09:35:51.423Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403220935on073.dropband.co"
                        },
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403220935on073.punkbit.com"
                        },
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "stg202403220935on073.dropbeat.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403220935on073.dropband.co"
                        },
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403220935on073.punkbit.com"
                        },
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "stg202403220935on073.dropbeat.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_HYmgWnxDFnJ3nncxy-WV",
                    "createdAt": "2024-03-22T09:41:07.584Z",
                    "id": "clu2h1eo00001l908zyt1zbvg",
                    "name": "uistg202403220941",
                    "updatedAt": "2024-03-22T09:44:17.059Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "uistg202403220941.dropband.co"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "uistg202403220941.dropband.co"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_mVHeot9mDm_kMVyFHKuz",
                    "createdAt": "2024-03-28T09:00:33.923Z",
                    "id": "club08cua0003l108hwxkxom5",
                    "name": "foobar322332",
                    "updatedAt": "2024-03-28T09:00:33.923Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "fooba42332.cc"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "fooba42332.cc"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_am9YRhsYLliEonEPDPW4",
                    "createdAt": "2024-06-18T15:08:28.493Z",
                    "id": "clxkjhcct0003ipxjjw6j2psu",
                    "name": "202406181608",
                    "updatedAt": "2024-06-18T15:15:36.057Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "202406181608.com"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "202406181608.com"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_1aLOJvzlUtl-SuKNcD0_",
                    "createdAt": "2024-08-01T09:40:22.347Z",
                    "id": "clzb34vre0003t2q3ssdsi5f8",
                    "name": "1aug2k241039",
                    "updatedAt": "2024-08-01T09:40:22.347Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "fleek-test.network"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "fleek-test.network"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_r_XDtEjvheVYXxpoN3u9",
                    "createdAt": "2024-08-23T14:23:07.666Z",
                    "id": "cm06sx8y90003rndbv7magoz9",
                    "name": "test23aug",
                    "updatedAt": "2024-08-23T14:23:07.666Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "fleek-test.network"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "fleek-test.network"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_pPBcAEwChNvLPFniS48U",
                    "createdAt": "2024-08-31T12:27:15.309Z",
                    "id": "cm0i4b1t90006149teku9guzf",
                    "name": "fri6sep15h032k24",
                    "updatedAt": "2024-09-06T14:03:47.402Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "site321.cc"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "site321.cc"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_ueD0zZF9uESvaSUG0vE0",
                    "createdAt": "2024-10-28T10:48:50.531Z",
                    "id": "cm2swbwbp00014yh01a9mf3ep",
                    "name": "hjjhhj",
                    "updatedAt": "2024-10-28T10:48:50.531Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "goo.py"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "goo.py"
                        }
                    ]
                },
                {
                    "__typename": "Application",
                    "clientId": "client_jkVvSupKLl20Ss-D_AyU",
                    "createdAt": "2025-01-12T16:47:18.557Z",
                    "id": "cm5tulmov0001q5zatufxt94p",
                    "name": "test232323",
                    "updatedAt": "2025-01-12T16:47:18.557Z",
                    "whitelistDomains": [
                        {
                            "__typename": "ApplicationWhitelistDomain",
                            "hostname": "sddssdsdds.cc"
                        }
                    ],
                    "whiteLabelDomains": [
                        {
                            "__typename": "ApplicationWhiteLabelDomain",
                            "hostname": "sddssdsdds.cc"
                        }
                    ]
                }
            ]
        }
    }
};

export const application = {
    "errors": [
        {
            "message": "Application not found.",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "application"
            ],
            "extensions": {
                "name": "ApplicationNotFoundError",
                "data": {
                    "application": {
                        "id": ""
                    }
                }
            }
        }
    ],
    "data": null
};

export const gitProviders = {
    "data": {
        "gitProviders": [
            {
                "__typename": "GitProvider",
                "id": "clwzcg4740000krfb09tt2a37",
                "name": "Fleek Templates STG",
                "tags": [
                    "templates"
                ],
                "enabled": true,
                "sourceProvider": "GITHUB",
                "createdAt": "2024-06-03T19:08:24.256Z"
            },
            {
                "__typename": "GitProvider",
                "id": "clx33myoa00008rw3jiujwe9e",
                "name": "Fleek CI STG",
                "tags": [
                    "sites"
                ],
                "enabled": true,
                "sourceProvider": "GITHUB",
                "createdAt": "2024-06-06T10:12:51.849Z"
            }
        ]
    }
};

export const siteDeploymentRequirements = {
    "data": {
        "siteDeploymentRequirements": {
            "__typename": "SiteDeploymentRequirements",
            "authorizationUrl": "",
            "installationUrl": "https://github.com/apps/fleek-templates-stg/installations/new?state=%7B%22userId%22%3A%22cls4v90nr0000l708op4q669h%22%2C%22gitProviderId%22%3A%22clwzcg4740000krfb09tt2a37%22%2C%22hash%22%3A%22fqxQEFh_H3CHlY1dIUPdWJdBEhiu7w8S%22%7D&redirect_uri=https://github3.service.staging.fleeksandbox.xyz/callback",
            "shouldAuthenticate": false,
            "shouldInstall": true
        }
    }
};

export const permissionGroups = {
    "data": {
        "permissionGroups": {
            "__typename": "PermissionGroupsWithAggregation",
            "data": [
                {
                    "__typename": "PermissionGroup",
                    "id": "clvuwdf640000cau9t0ppmbri",
                    "name": "Owner",
                    "description": "All permissions"
                },
                {
                    "__typename": "PermissionGroup",
                    "id": "clvuwdf640001cau99uv6qoji",
                    "name": "Admin",
                    "description": "Can create, read, update and delete most data"
                },
                {
                    "__typename": "PermissionGroup",
                    "id": "clvuwdf640002cau9vzrv9pib",
                    "name": "Member",
                    "description": "Can create, read, update and delete some data"
                },
                {
                    "__typename": "PermissionGroup",
                    "id": "clvuwdf640003cau9dkk98fhw",
                    "name": "Read Only",
                    "description": "Can only read data"
                }
            ]
        }
    }
};

export const projectMembers = {
    "data": {
        "project": {
            "__typename": "Project",
            "memberships": [
                {
                    "__typename": "Membership",
                    "id": "cls4v91mt0003l708etg203c7",
                    "role": "OWNER",
                    "createdAt": "2024-02-02T16:35:06.245Z",
                    "permissionGroup": {
                        "__typename": "PermissionGroup",
                        "id": "clvuwdf640000cau9t0ppmbri",
                        "name": "Owner",
                        "description": "All permissions"
                    },
                    "user": {
                        "__typename": "User",
                        "id": "cls4v90nr0000l708op4q669h",
                        "email": "helder+test@fleek.xyz",
                        "username": "0xB09-3D22"
                    }
                }
            ]
        }
    }
};

export const invitations = {"data":{"invitations":{"__typename":"InvitationsWithAggregation","data":[]}}};
