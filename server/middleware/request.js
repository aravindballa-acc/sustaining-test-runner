const _ = require('lodash');

module.exports = (req, res, next) => {
    const _params = {};

    Object.assign(req, {
        /**
         * Gets a param from the combined POST and GET (body and query) collection
         * @param {String} name
         * @param {Any} [defaultVal]
         * 
         * @return the value of the param if available or the `defaultVal` if the param does not exist
         */
        getParam: (name, defaultVal) => {
            const params = req.getParams();
            const val = params[name];

            if (val === undefined && defaultVal !== undefined) {
                return defaultVal;
            }

            return val;
        },

        /**
         * Gets all the paramsfrom the combined POST and GET (body and query) collection
         * 
         * @return {Object}
         */
        getParams: () => Object.assign({}, req.body, req.params, _params),

        setParams: params => Object.assign(_params, params),

        /**
         * Checks the params of the request for their existance and sets
         * any default value (if provided) as necessary.
         * 
         * @return [Array/Boolean] `false` if no errors were present, or an `Array` of errors otherwise
         */
        checkFields: (fields = []) => {
            const errors = [];
            const params = req.getParams();

            for (let field of fields) {
                let name = field,
                    paramValue,
                    value,
                    message;

                if (_.isObject(field)) {
                    name = field.name;
                    value = field.value;
                    message = field.message;
                }

                if ((paramValue = params[name]) === undefined && value === undefined) {
                    errors.push({name, message: message || 'This field is required.'});
                } else {
                    params[name] = paramValue !== undefined ? paramValue : value;
                }
            }

            req.setParams(params);

            return errors.length ? errors : false;
        }
    });

    next();
}