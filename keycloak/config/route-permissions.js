angular.module('app').constant("KCroutePermissions",{
    "/leads": [
        {
            "resource_set_name" : "res:leads",
            // "scopes":["scopes:list"]
        }
    ],
    "/adduser": [
                    {
                        "resource_set_name" : "res:adduser",
                    }
                ],
    "/employee": [
        {
            "resource_set_name" : "res:employee",
        }
    ]
})