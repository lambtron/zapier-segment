'use strict';

var Zap = {
  writeKey_pre_poll: function(bundle) {
    /* 
    Argument:
      bundle.request.url: <string>
      bundle.request.method: <string> # 'GET'
      bundle.request.auth: <array> # [username, password]
      bundle.request.headers: <object>
      bundle.request.params: <object> # this will be mapped into the querystring
      bundle.request.data: <string> # str or null

      bundle.url_raw: <string>
      bundle.auth_fields: <object>
      bundle.trigger_fields: <object> # the fields provided by the user during setup

      bundle.zap: <object> # info about the zap
      bundle.meta: <object> # extra runtime information you can use

    The response should be an object of:
      url: <string>
      method: <string> # 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'
      auth: <array> # [username, password]
      headers: <object>
      params: <object> # this will be mapped into the query string
      data: <string> or null # request body: optional if POST, not needed if GET
    */
    return {
      url: bundle.request.url,
      method: 'POST',
      auth: bundle.request.auth,
      headers: bundle.request.headers,
      params: bundle.request.params,
      data: JSON.stringify({})
    }; // or return bundle.request;
  },
  track_pre_write: function(bundle) {
    var data = JSON.parse(bundle.request.data);
    
    if (data.context && data.context.campaign) {
      var campaign = data.context.campaign[0];
      data.context.campaign = campaign;
    }

    if (data.context) {
      data.context.library = {
        name: "Segment Zapier Connector",
        version: "0.0.2"
      };
    }
    
    return {
      url: bundle.request.url,
      method: 'POST',
      auth: bundle.request.auth,
      headers: bundle.request.headers,
      params: bundle.request.params,
      data: JSON.stringify(data)
    };
  },
  identify_pre_write: function(bundle) {
    var data = JSON.parse(bundle.request.data);
    
    if (data.context && data.context.campaign) {
      var campaign = data.context.campaign[0];
      data.context.campaign = campaign;
    }
     
    if (data.context) {
      data.context.library = {
        name: "Segment Zapier Connector",
        version: "0.0.2"
      };
    }
    
    return {
      url: bundle.request.url,
      method: 'POST',
      auth: bundle.request.auth,
      headers: bundle.request.headers,
      params: bundle.request.params,
      data: JSON.stringify(data)
    };
  }
};