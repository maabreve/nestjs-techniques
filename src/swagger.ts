export const apiSpec =
{
  "openapi": "3.0.0",
  "info": {
    "title": "Nest boilerplate",
    "description": "NestJs API description",
    "version": "1.0",
    "contact": {}
  },
  "tags": [
    {
      "name": "nestJs",
      "description": ""
    }
  ],
  "servers": [],
  "components": {},
  "paths": {
    "/": {
      "get": {
        "operationId": "AppController_getHello",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/item": {
      "get": {
        "operationId": "ItemController_getAll",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      },
      "post": {
        "operationId": "ItemController_create",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        }
      },
      "put": {
        "operationId": "ItemController_update",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/item/{id}": {
      "get": {
        "operationId": "ItemController_getOne",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      },
      "delete": {
        "operationId": "ItemController_delete",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  }
}