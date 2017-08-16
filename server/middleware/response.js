module.exports = (req, res, next) => {
    const errors = [];

    Object.assign(res, {
        /**
         * Sets an error message for the response.
         * @param {String} name name of the field with the error
         * @param {String} message the error message
         */
        setError: (name, message) => errors.push({name, message}),

        /**
         * Responds with the provided `data` as JSON. The default response is a success, but may
         * change if errors have been set prior to sending this output.
         * @param {Object} data
         */
        outputJson: data => {
            // common response for all JSON responses
            const result = {
                success: true, // always assume a successful response unless otherwise set
                message: '',
                data: []
            }

            Object.assign(result, data);

            if (!result.success) {
                result.errors = [...errors];

                if (data.errors) {
                    result.errors = [...result.errors, ...data.errors];
                }
            }

            res.json(result);
        },

        /**
         * Responds with an unsuccessful JSON response and the errors provided.
         * @param {Object[]} [errors]
         */
        outputError: (errors = []) => {
            res.outputJson({
                success: false,
                errors
            });
        },

        /**
         * Responds with an empty successful JSON response.
         */
        outputSuccess: () => {
            res.outputJson({});
        },
    });

    next();
}