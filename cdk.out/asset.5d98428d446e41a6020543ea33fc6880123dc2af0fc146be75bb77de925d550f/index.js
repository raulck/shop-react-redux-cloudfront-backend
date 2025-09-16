"use strict";var o=Object.defineProperty;var r=Object.getOwnPropertyDescriptor;var n=Object.getOwnPropertyNames;var d=Object.prototype.hasOwnProperty;var c=(t,e)=>{for(var i in e)o(t,i,{get:e[i],enumerable:!0})},l=(t,e,i,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of n(e))!d.call(t,a)&&a!==i&&o(t,a,{get:()=>e[a],enumerable:!(s=r(e,a))||s.enumerable});return t};var w=t=>l(o({},"__esModule",{value:!0}),t);var h={};c(h,{main:()=>g});module.exports=w(h);var u=`<!doctype html>
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
      url: 'https://j3oxkk4qak.execute-api.eu-north-1.amazonaws.com/dev/openapi.json',
      dom_id: '#swagger-ui',
      deepLinking: true
    });
  };
</script>
</body>
</html>`,g=async t=>({statusCode:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-cache","Access-Control-Allow-Origin":"*"},body:u});0&&(module.exports={main});
//# sourceMappingURL=index.js.map
