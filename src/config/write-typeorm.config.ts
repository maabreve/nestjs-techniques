import { GlobalConfig } from './global.config';
import fs = require('fs');
fs.writeFileSync('ormconfig.json',
  JSON.stringify(GlobalConfig.getTypeOrmConfig(), null, 2)
);