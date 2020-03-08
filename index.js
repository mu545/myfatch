function Petch ({origin = null, options = {}, headers = {}} = {}) {
  // a.k.a this
  const self = this

  const setting = {
    origin: window.location.origin,
    options: {},
    headers: {}
  }

  /**
   * Apply all received setting parameters.
   *
   * @return  void
   */
  const setup = function () {
    setting.origin = origin || setting.origin
    setting.options = {...setting.options, ...options}
    setting.headers = {...setting.headers, ...headers}
  }

  /**
   * Create option from setting.
   *
   * @param   object
   * @param   object
   * @param   object
   * @return  object
   */
  const createOption = function (options, headers, body) {
    let currentOptions = {...setting.options, ...options}

    currentOptions.headers = {...setting.headers, ...headers}
   
    if (typeof body !== null) {
      currentOptions.body = body
    }

    return currentOptions
  }

  /**
   * Create form data.
   *
   * @param   object
   * @return  object
   */
  const createFormData = function (body) {
    let formData = new FormData()

    for (var field in body) {
      formData.append(field, body[field])
    }

    return formData
  }

  /**
   * Request with get method.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.get = function (url, {options = {}, headers = {}} = {}) {
    return fetch(`${setting.origin}/${url}`, createOption(options, headers, null))
  }

  /**
   * Request with post method.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.postData = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'POST'

    headers['Content-Type'] = 'application/x-www-form-urlencoded'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, createFormData(body)))
  }

  /**
   * Request with delete method.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.deleteData = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'DELETE'

    headers['Content-Type'] = 'application/x-www-form-urlencoded'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, createFormData(body)))
  }


  /**
   * Request with post method to upload files.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.uploadData = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'POST'

    headers['Content-Type'] = 'multipart/form-data'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, createFormData(body)))
  }

  /**
   * Request with post data to send json body.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.postJSON = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'POST'

    headers['Content-Type'] = 'application/json'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, JSON.stringify(body)))
  }

  /**
   * Request with delete method to send json body.
   *
   * @param   string
   * @param   object
   * @return  promise
   */
  this.deleteJSON = function (url, {options = {}, headers = {}, body = {}} = {}) {
    options['method'] = 'DELETE'

    headers['Content-Type'] = 'application/json'

    return fetch(`${setting.origin}/${url}`, createOption(options, headers, JSON.stringify(body)))
  }

  // Pre-setup initialization
  setup()
}

module.exports = Petch