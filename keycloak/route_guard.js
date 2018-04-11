angular.module('app').constant("KCrouteGuard",{
    redirectUnauthorizedView: function($location, deferred, message){
        $location.path("/unauthorized");
        deferred.reject(message);
    },
    protect: function(permissions, resolvable_instance){ // arguments passed in are permissions & resolvable instance object of the same format as specified in the documentation of resolve under angular $routeProvider
        var resolves = {}, self = this;
        if(typeof resolvable_instance === 'object'){
            for(var key in resolvable_instance){
                if(typeof resolvable_instance[key] === 'string' || typeof resolvable_instance[key] === 'function')
                    resolves[key] = resolvable_instance[key];
            }
        }

        resolves.check_resource_authorization = ["$q", "$ajkeycloak", "$location", "ajkeycloakservice", function($q, $ajkeycloak, $location, ajkeycloakservice){
            var deferred = $q.defer();
            if($ajkeycloak){

                $ajkeycloak.protect(permissions)
                        .then(function(res){
                            console.log("check resource authorization with access:", res);
                            deferred.resolve(res);
                        })
                        .catch(function(err){
                            console.warn("check resource authorization error:", err);
                            ajkeycloakservice.inValidApiAccess = true;
                            self.redirectUnauthorizedView($location, deferred, err);
                        });
            }
            else{
                $location.path("/unauthorized");
                self.redirectUnauthorizedView($location, deferred, "keycloak instance not present");
            }
            return deferred.promise;
        }];

        return resolves;
    }
});