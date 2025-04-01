{
  "attributes": {
    "firstName": {
      "type": "string",
      "required": true
    },
    "lastName": {
      "type": "string",
      "required": true
    },
    "phone": {
      "type": "string"
    },
    "address": {
      "type": "text"
    },
    "orders": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::order.order",
      "mappedBy": "customer"
    }
  }
}