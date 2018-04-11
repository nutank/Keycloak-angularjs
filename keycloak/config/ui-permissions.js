angular.module('app').constant("KCuiPermissions",{
    "/adduser": {
                    "ui_create":  [
                        {
                            "resource_set_name" : "res:adduser",
                            "scopes":["scopes:create"]
                        }
                    ]
                },
    "/leads": {
        "ui_input_search_leads": [{ // example disabled permissions. If scopes are returned from entitlements check pass in at least 1 valid scope!
            "resource_set_name" : "res:leads",
            // "scopes":["scopes:leads-filter"]
        }],
        "ui_filter_expired": []
    },
});