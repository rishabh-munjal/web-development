# HTTP & URI Basics

## 1. URL, URI, and URN

### URL (Uniform Resource Locator)
A URL is a specific type of URI that not only identifies a resource but also provides the means to locate it by specifying its address and access method.

#### Example:
```
https://www.example.com/index.html
```
Components of a URL:
- **Protocol/Scheme**: `https://`
- **Domain Name/Host**: `www.example.com`
- **Path**: `/index.html`

### URI (Uniform Resource Identifier)
A URI is a broader concept that uniquely identifies a resource. URLs and URNs are both types of URIs.

#### Example:
```
https://www.example.com/products?category=electronics
mailto:user@example.com
```

### URN (Uniform Resource Name)
A URN is a unique identifier for a resource, but it does not specify its location or access method.

#### Example:
```
urn:isbn:0451450523
```
Here, `isbn:0451450523` uniquely identifies a book but does not provide any location details.

---

## 2. HTTP Headers

HTTP headers are key-value pairs sent along with an HTTP request or response, providing metadata about the request/response.

### Categories of HTTP Headers:
1. **General Headers** - Apply to both requests and responses.
2. **Request Headers** - Provide additional information about the request.
3. **Response Headers** - Provide additional information about the response.
4. **Entity Headers** - Provide metadata about the content/body.

### Common HTTP Headers:
| Header Name       | Type       | Description |
|------------------|-----------|-------------|
| `Content-Type`  | Entity     | Specifies the media type of the resource (e.g., `text/html`). |
| `Authorization` | Request    | Used for authentication (e.g., `Bearer <token>`). |
| `User-Agent`    | Request    | Identifies the client software making the request. |
| `Accept`        | Request    | Specifies media types the client can process. |
| `Cache-Control` | General    | Directs caching behavior. |
| `Set-Cookie`    | Response   | Sends cookies from server to client. |
| `Content-Length`| Entity     | Specifies the size of the response body. |

---

## 3. HTTP Methods

HTTP defines various request methods to perform different actions on a resource.

| Method  | Description |
|---------|-------------|
| `GET`   | Retrieves a resource without modifying it. |
| `POST`  | Submits data to the server to create a resource. |
| `PUT`   | Updates a resource (or creates if not exists). |
| `DELETE`| Deletes a resource. |
| `PATCH` | Partially updates a resource. |
| `HEAD`  | Retrieves headers of a resource without the body. |
| `OPTIONS` | Retrieves the HTTP methods supported by the server. |

---

## 4. HTTP Status Codes

HTTP status codes indicate the result of an HTTP request.

### Categories of Status Codes:
1. **1xx (Informational)** - Request received, continuing process.
2. **2xx (Success)** - Request successfully processed.
3. **3xx (Redirection)** - Further action required to complete the request.
4. **4xx (Client Errors)** - Errors caused by the client’s request.
5. **5xx (Server Errors)** - Errors caused by the server.

### Common HTTP Status Codes:

| Code | Category | Meaning |
|------|----------|-------------|
| `200 OK` | Success | Request succeeded. |
| `201 Created` | Success | Resource created successfully. |
| `204 No Content` | Success | Request succeeded but no content returned. |
| `301 Moved Permanently` | Redirection | Resource moved to a new location permanently. |
| `302 Found` | Redirection | Temporary redirect. |
| `400 Bad Request` | Client Error | Malformed or invalid request. |
| `401 Unauthorized` | Client Error | Authentication required. |
| `403 Forbidden` | Client Error | Access denied. |
| `404 Not Found` | Client Error | Requested resource not found. |
| `500 Internal Server Error` | Server Error | Server encountered an error. |
| `503 Service Unavailable` | Server Error | Server is temporarily overloaded or under maintenance. |

---

## Conclusion
Understanding URLs, URIs, HTTP headers, methods, and status codes is crucial for web development and API communication. This document serves as a quick reference guide for developers to navigate the fundamentals of HTTP communication effectively.