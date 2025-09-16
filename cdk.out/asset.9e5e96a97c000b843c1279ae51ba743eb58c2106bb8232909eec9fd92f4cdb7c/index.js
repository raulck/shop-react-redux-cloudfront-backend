"use strict";var s=Object.defineProperty;var o=Object.getOwnPropertyDescriptor;var n=Object.getOwnPropertyNames;var d=Object.prototype.hasOwnProperty;var c=(t,e)=>{for(var a in e)s(t,a,{get:e[a],enumerable:!0})},l=(t,e,a,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of n(e))!d.call(t,i)&&i!==a&&s(t,i,{get:()=>e[i],enumerable:!(r=o(e,i))||r.enumerable});return t};var w=t=>l(s({},"__esModule",{value:!0}),t);var h={};c(h,{main:()=>u});module.exports=w(h);var g=`<!doctype html>
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
      url: './openApi',
      dom_id: '#swagger-ui',
      deepLinking: true
    });
  };
</script>
</body>
</html>`,u=async t=>({statusCode:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-cache","Access-Control-Allow-Origin":"*"},body:g});0&&(module.exports={main});
//# sourceMappingURL=index.js.map
