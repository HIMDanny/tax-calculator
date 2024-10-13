// Codes retrieved on Thu, 03 Oct 2024 12:05:14 GMT from https://raw.githubusercontent.com/prettymuchbryce/http-status-codes/refs/heads/master/codes.json

export const HttpStatusCode = {
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.1
   *
   * This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
   */
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.1
   *
   * The request has succeeded. The meaning of a success varies depending on the HTTP method:
   * GET: The resource has been fetched and is transmitted in the message body.
   * HEAD: The entity headers are in the message body.
   * POST: The resource describing the result of the action is transmitted in the message body.
   * TRACE: The message body contains the request message as received by the server
   */
  OK: 200,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.2
   *
   * The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.
   */
  Created: 201,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.3
   *
   * The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
   */
  Accepted: 202,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.5
   *
   * There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.
   */
  NoContent: 204,

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.1
   *
   * The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.
   */
  MultipleChoices: 300,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.2
   *
   * This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.
   */
  MovedPermanently: 301,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.3
   *
   * This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
   */
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  TemporaryRedirect: 307,

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.1
   *
   * This response means that server could not understand the request due to invalid syntax.
   */
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.3
   *
   * The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.
   */
  Forbidden: 403,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.4
   *
   * The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.
   */
  NotFound: 404,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.5
   *
   * The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
   */
  MethodNotAllowed: 405,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.6
   *
   * This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.
   */
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.8
   *
   * This response is sent when a request conflicts with the current state of the server.
   */
  Conflict: 409,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.9
   *
   * This response would be sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
   */
  Gone: 410,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.10
   *
   * The server rejected the request because the Content-Length header field is not defined and the server requires it.
   */
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  URITooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.14
   *
   * This response code means the expectation indicated by the Expect request header field can't be met by the server.
   */
  ExpectationFailed: 417,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2324#section-2.3.2
   *
   * Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
   */
  IAmATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.4
   *
   * The resource that is being accessed is locked.
   */
  Locked: 423,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.5
   *
   * The request failed due to failure of a previous request.
   */
  FailedDependency: 424,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.1
   *
   * The server encountered an unexpected condition that prevented it from fulfilling the request.
   */
  InternalServerError: 500,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.2
   *
   * The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
   */
  NotImplemented: 501,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.3
   *
   * This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
   */
  BadGateway: 502,
  ServiceUnavailable: 503,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.5
   *
   * This error response is given when the server is acting as a gateway and cannot get a response in time.
   */
  GatewayTimeout: 504,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.6
   *
   * The HTTP version used in the request is not supported by the server.
   */
  HTTPVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
   *
   * The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.
   */
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-6
   *
   * The 511 status code indicates that the client needs to authenticate to gain network access.
   */
  NetworkAuthenticationRequired: 511,
} as const;
