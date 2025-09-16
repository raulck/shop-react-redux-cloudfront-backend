"use strict";var a=Object.defineProperty;var r=Object.getOwnPropertyDescriptor;var n=Object.getOwnPropertyNames;var d=Object.prototype.hasOwnProperty;var c=(t,e)=>{for(var s in e)a(t,s,{get:e[s],enumerable:!0})},l=(t,e,s,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of n(e))!d.call(t,i)&&i!==s&&a(t,i,{get:()=>e[i],enumerable:!(o=r(e,i))||o.enumerable});return t};var w=t=>l(a({},"__esModule",{value:!0}),t);var h={};c(h,{main:()=>u});module.exports=w(h);var g=`<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Product Service \u2014 Swagger UI</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"/>
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
<script>
  window.onload = () => {
    window.ui = SwaggerUIBundle({
      url: '/openApi.json',
      dom_id: '#swagger-ui',
      deepLinking: true
    });
  };
</script>
</body>
</html>`,u=async t=>({statusCode:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-cache","Access-Control-Allow-Origin":"*"},body:g});0&&(module.exports={main});
//# sourceMappingURL=index.js.map
