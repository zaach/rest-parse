/*!
 * restParse
 * MIT Licensed
 *
 * See the README.md file for documentation.
 */


var request = require('request');
var _ = require('underscore');

var user = function(lib) {
    this.signUp = function(user, callback) {
        lib._jsonRequest({
            method: 'POST',
            url: '/users',
            params: user,
            callback: function(err, res, body, success) {
                if (!err && success)
                    body = _.extend({}, user, body);
                callback(err, res, body, success);
            }
        })
    },

    this.logIn = function(username, password, callback) {
        lib._jsonRequest({
            url: '/login',
            params: {
                username: username,
                password: password
            },
            callback: callback
        });
    }

    this.get = function(objectId, params, callback) {
        lib._jsonRequest({
            url: '/users/' + objectId,
            params: _.isFunction(params) ? null : params,
            callback: _.isFunction(params) ? params : callback
        });
    }

    // Also used for validating a session token
    // https://parse.com/docs/rest#users-validating
    this.getCurrent = function(callback) {
        lib._jsonRequest({
            url: '/users/me',
            callback: callback
        });
    }

    this.update = function(objectId, updatedUser, callback) {
        lib._jsonRequest({
            method: 'PUT',
            url: '/users/' + objectId,
            params: updatedUser,
            callback: callback
        });
    }

    this.delete = function(objectId, callback) {
        lib._jsonRequest({
            method: 'DELETE',
            url: '/users/' + objectId,
            callback: callback
        });
    }

    this.getAll = function(params, callback) {
        lib._jsonRequest({
            url: '/users',
            params: _.isFunction(params) ? null : params,
            callback: _.isFunction(params) ? params : callback
        });
    }

    this.requestResetPassword = function(email, callback) {
        lib._jsonRequest({
            method: 'POST',
            url: '/requestPasswordReset',
            params: {'email': email},
            callback: callback
        });
    }

    this.logInSocial = function(authData, callback) {
        lib._jsonRequest({
            method: 'POST',
            url: '/users',
            params: {authData: authData},
            callback: callback
        });
    },

    this.linkWithSocial = function(objectId, authData, callback) {
        lib._jsonRequest({
            method: 'PUT',
            url: '/users/' + objectId,
            params: {authData: authData},
            callback: callback
        });
    },

    this.unlinkWithSocial = function(objectId, authData, callback) {
        lib._jsonRequest({
            method: 'PUT',
            url: '/users/' + objectId,
            params: {authData: authData},
            callback: callback
        });
    }
}

var object = function(lib, className) {
    this.className = className;

    this.create = function(objectData, callback) {
        lib._jsonRequest({
            method: 'POST',
            url: '/classes/' + this.className,
            params: objectData,
            callback: function(err, res, body, success) {
                if (!err && success)
                    body = _.extend({}, objectData, body);
                callback(err, res, body, success);
            }
        });
    };

    this.get = function(objectId, params, callback) {
        lib._jsonRequest({
            url: '/classes/' + this.className + '/' + objectId,
            params: _.isFunction(params) ? null : params,
            callback: _.isFunction(params) ? params : callback
        });
    };

    this.update = function(objectId, updateData, callback) {
        lib._jsonRequest({
            method: 'PUT',
            url: '/classes/' + this.className + '/' + objectId,
            params: updateData,
            callback: callback
        });
    };

    this.delete = function(objectId, callback) {
        lib._jsonRequest({
            method: 'DELETE',
            url: '/classes/' + this.className + '/' + objectId,
            callback: callback
        });
    };

    this.count = function(params, callback) {
        var paramsMod = params;

        if (_.isFunction(params)) {
            paramsMod = {};
            paramsMod['count'] = 1;
            paramsMod['limit'] = 0;
        } else {
            paramsMod['count'] = 1;
            paramsMod['limit'] = 0;
        }

        lib._jsonRequest({
            url: '/classes/' + className,
            params: paramsMod,
            callback: _.isFunction(params) ? params : callback
        });
    },

    this.updateCounter = function(objectId, fieldName, amount, callback) {
        var body = {};
        body[fieldName] = {
            __op: 'Increment',
            amount: amount
        }

        lib._jsonRequest({
            method: 'PUT',
            url: '/classes' + this.className + '/' + objectId,
            body: body,
            callback: callback
        });
    }

    this.createMany = function(objects, callback) {
        var requests = [];
        for (var i = 0; i < objects.length; i++) {
            requests.push({
                method: 'POST',
                path: '/classes/' + this.className,
                body: objects[i]
            });
        }
        lib._jsonRequest({
            method: 'POST',
            url: '/batch/',
            params: {
                requests: requests
            },
            callback: function(err, res, body, success) {
                if (!err && success)
                    body = _.extend({}, objects, body);
                callback(err, res, body, success);
            }
        });
    }

    this.updateMany = function(updates, callback) {
        var requests = [];
        for (var i = 0; i < updates.length; i++) {
            requests.push({
                method: 'PUT',
                path: '/classes/' + this.className + '/' + updates[i].objectId,
                body: updates[i].data
            });
        }
        lib._jsonRequest({
            method: 'POST',
            url: '/batch/',
            params: {
                requests: requests
            },
            callback: callback
        });
    };

    this.deleteMany = function(deletes, callback) {
        var requests = [];
        for (var i = 0; i < deletes.length; i++) {
            requests.push({
                method: 'DELETE',
                path: '/classes/' + this.className + '/' + deletes[i].objectId
            });
        }
        lib._jsonRequest({
            method: 'POST',
            url: '/batch/',
            params: {
                requests: requests
            },
            callback: callback
        });
    };

    this.getAll = function(params, callback) {
        lib._jsonRequest({
            url: '/classes/' + this.className,
            params: _.isFunction(params) ? null : params,
            callback: _.isFunction(params) ? params : callback
        });
    };
}

var role = function(lib) {
    this.create = function(data, callback) {
        lib._jsonRequest({
            method: 'POST',
            url: '/roles',
            params: data,
            callback: function(err, res, body, success) {
                if (!err && success)
                    body = _.extend({}, data, body);
                callback(err, res, body, success);
            }
        });
    }

    this.get = function(objectId, params, callback) {
        lib._jsonRequest({
            url: '/roles/' + objectId,
            params: _.isFunction(params) ? null : params,
            callback: _.isFunction(params) ? params : callback
        });
    }

    this.update = function(objectId, data, callback) {
        lib._jsonRequest({
            method: 'PUT',
            url: '/roles/' + objectId,
            params: data,
            callback: callback
        });
    }

    this.delete = function(objectId, callback) {
        lib._jsonRequest({
            method: 'DELETE',
            url: '/roles/' + objectId,
            callback: callback
        });
    }

    this.getAll = function(params, callback) {
        lib._jsonRequest({
            url: '/roles',
            params: _.isFunction(params) ? null : params,
            callback: _.isFunction(params) ? params : callback
        });
    }
}

var file = function(lib) {
    this.upload = function(filePath, fileName, callback) {
        if (_.isFunction(fileName)) {
            callback = fileName;
            fileName = null;
        }

        var contentType = require('mime').lookup(filePath);
        if (!fileName)
            fileName = filePath.replace(/^.*[\\\/]/, ''); // http://stackoverflow.com/a/423385/246142
        var buffer = require('fs').readFileSync(filePath);
        this.uploadBuffer(buffer, contentType, fileName, callback);
    }

    this.uploadBuffer = function(buffer, contentType, fileName, callback) {
        lib._jsonRequest({
            method: 'POST',
            url: '/files/' + fileName,
            body: buffer,
            headers: { 'Content-type': contentType },
            callback: callback
        });
    }

    this.delete = function(name, callback) {
        lib._jsonRequest({
            method: 'DELETE',
            url: '/files/' + name,
            callback: callback
        });
    }
}

var analytic = function(lib) {
    this.sendAnalyticsEvent = function(eventName, dimensionsOrCallback, callback) {
        lib._jsonRequest({
            method: 'POST',
            url: '/events/' + eventName,
            params: _.isFunction(dimensionsOrCallback) ? {} : dimensionsOrCallback,
            callback: _.isFunction(dimensionsOrCallback) ? dimensionsOrCallback : callback
        });
    }
}

var push = function(lib) {
    this.sendNotification = function(data, callback) {
        lib._jsonRequest({
            method: 'POST',
            url: '/push',
            params: data,
            callback: function(err, res, body, success) {
                if (!err && success)
                    body = _.extend({}, data, body);

                callback.apply(this, arguments);
            }
        });
    }
}

var restParse = function(options) {
    var $this = this;
    this.API_BASE_URL = options.baseUrl || 'https://api.parse.com/1';
    this.applicationId = options.appId;
    this.restAPIKey = options.restAPIKey;
    this.masterKey = options.masterKey;
    this.sessionToken = _.isUndefined(options.sessionToken) ? null : options.sessionToken;

    this.user = function initUser() {
        return new user($this);
    }
    this.object = function initObject(className) {
        return new object($this, className);
    }
    this.role = function initRole() {
        return new role($this);
    }
    this.file = function initFile() {
        return new file($this);
    }
    this.analytic = function initAnalytic() {
        return new analytic($this);
    }
    this.push = function initPush() {
        return new push($this);
    }

    this.stringifyParamValues = function(params) {
        if (!params || _.isEmpty(params))
            return null;
        var values = _(params).map(function(value, key) {
            if (_.isObject(value) || _.isArray(value))
                return JSON.stringify(value);
            else
                return value;
        });
        var keys = _(params).keys();
        var ret = {};
        for (var i = 0; i < keys.length; i++)
            ret[keys[i]] = values[i];
        return ret;
    },

    this._jsonRequest = function(opts) {
        opts = _.extend({
            method: 'GET',
            url: null,
            params: null,
            body: null,
            headers: null,
            callback: null
        }, opts);

        var reqOpts = {
            method: opts.method,
            headers: {
                'X-Parse-Application-Id': this.applicationId
            }
        };
        if (this.sessionToken)
            reqOpts.headers['X-Parse-Session-Token'] = this.sessionToken;
        if (this.masterKey)
            reqOpts.headers['X-Parse-Master-Key'] = this.masterKey;
        if (this.restAPIKey)
            reqOpts.headers['X-Parse-REST-API-Key'] = this.restAPIKey;
        if (opts.headers)
            _.extend(reqOpts.headers, opts.headers);

        if (opts.params) {
            if (opts.method == 'GET')
                opts.params = this.stringifyParamValues(opts.params);

            var key = 'qs';
            if (opts.method === 'POST' || opts.method === 'PUT')
                key = 'json';
            reqOpts[key] = opts.params;
        } else if (opts.body) {
            reqOpts.body = opts.body;
        }
        request(this.API_BASE_URL + opts.url, reqOpts, function(err, res, body) {
            var isCountRequest = opts.params && !_.isUndefined(opts.params['count']) && !!opts.params.count;
            var success = !err && (res.statusCode === 200 || res.statusCode === 201);
            if (res && res.headers['content-type'] && 
                res.headers['content-type'].toLowerCase().indexOf('application/json') >= 0) {
                if (!_.isObject(body) && !_.isArray(body)) // just in case it's been parsed already
                    body = JSON.parse(body);
                if (body.error) {
                    success = false;
                } else if (body.results && _.isArray(body.results) && !isCountRequest) {
                    // If this is a "count" request. Don't touch the body/result.
                    body = body.results;
                }
            }
            opts.callback(err, res, body, success);
        });
    }
};

module.exports = restParse;
