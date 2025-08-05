const express = require('express');
const router = express.Router();

// Import version-specific routes
const v1Routes = require('./v1');
// const v2Routes = require('./v2'); // Ready for future v2

// API overview endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Simple Blog API',
    availableVersions: {
      v1: {
        path: '/api/v1',
        status: 'STABLE',
        documentation: `${req.protocol}://${req.get('host')}/api/v1`
      }
      // v2: {
      //   path: '/api/v2', 
      //   status: 'COMING_SOON',
      //   documentation: `${req.protocol}://${req.get('host')}/api/v2`
      // }
    },
    defaultVersion: 'v1',
    currentVersion: 'v1'
  });
});

// Mount version-specific routes
router.use('/v1', v1Routes);
// router.use('/v2', v2Routes); // Ready for future v2

module.exports = router;
