"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Product Service — Swagger UI</title>
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
      url: './openapi.json',
      dom_id: '#swagger-ui',
      deepLinking: true
    });
  };
</script>
</body>
</html>`;
const handler = async (_event) => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
        },
        body: html,
    };
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U3dhZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFN3YWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxJQUFJLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFzQkwsQ0FBQztBQUVGLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFDMUIsTUFBNEIsRUFDSSxFQUFFO0lBQ2xDLE9BQU87UUFDTCxVQUFVLEVBQUUsR0FBRztRQUNmLE9BQU8sRUFBRTtZQUNQLGNBQWMsRUFBRSwwQkFBMEI7WUFDMUMsZUFBZSxFQUFFLFVBQVU7WUFDM0IsNkJBQTZCLEVBQUUsR0FBRztTQUNuQztRQUNELElBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQztBQUNKLENBQUMsQ0FBQztBQVpXLFFBQUEsT0FBTyxXQVlsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcblxyXG5jb25zdCBodG1sID0gYDwhZG9jdHlwZSBodG1sPlxyXG48aHRtbD5cclxuPGhlYWQ+XHJcbiAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCIvPlxyXG4gIDx0aXRsZT5Qcm9kdWN0IFNlcnZpY2Ug4oCUIFN3YWdnZXIgVUk8L3RpdGxlPlxyXG4gIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiPlxyXG4gIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIlxyXG4gICAgICAgIGhyZWY9XCJodHRwczovL3VucGtnLmNvbS9zd2FnZ2VyLXVpLWRpc3RANS9zd2FnZ2VyLXVpLmNzc1wiLz5cclxuPC9oZWFkPlxyXG48Ym9keT5cclxuPGRpdiBpZD1cInN3YWdnZXItdWlcIj48L2Rpdj5cclxuPHNjcmlwdCBzcmM9XCJodHRwczovL3VucGtnLmNvbS9zd2FnZ2VyLXVpLWRpc3RANS9zd2FnZ2VyLXVpLWJ1bmRsZS5qc1wiPjwvc2NyaXB0PlxyXG48c2NyaXB0PlxyXG4gIHdpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICB3aW5kb3cudWkgPSBTd2FnZ2VyVUlCdW5kbGUoe1xyXG4gICAgICB1cmw6ICcuL29wZW5hcGkuanNvbicsXHJcbiAgICAgIGRvbV9pZDogJyNzd2FnZ2VyLXVpJyxcclxuICAgICAgZGVlcExpbmtpbmc6IHRydWVcclxuICAgIH0pO1xyXG4gIH07XHJcbjwvc2NyaXB0PlxyXG48L2JvZHk+XHJcbjwvaHRtbD5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoXHJcbiAgX2V2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudFxyXG4pOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLFxyXG4gICAgfSxcclxuICAgIGJvZHk6IGh0bWwsXHJcbiAgfTtcclxufTtcclxuIl19