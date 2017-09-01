const express = require( 'express' );
const router = express.Router( );

router.use(require( '../middleware/request' ));
router.use(require( '../middleware/response' ));

router.use('/api/testcases', require( './testcases' ));
router.use('/api/projects', require( './projects' ));

module.exports = router;