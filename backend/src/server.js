require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cityRoutes = require('./routes/city.routes');
const roleRoutes = require('./routes/role.routes');
const positionRoutes = require('./routes/position.routes');
const departamentRoutes = require('./routes/departament.routes');
const contractStatusRoutes = require('./routes/contract_status.routes');
const contractTypeRoutes = require('./routes/contract_type.routes');
const approvalStatusRoutes = require('./routes/approval_status.routes');
const leavesStatusRoutes = require('./routes/leaves_status.routes');
const leavesTypeRoutes = require('./routes/leaves_type.routes');
const employeeRoutes = require('./routes/employee.routes');
const paysheetRoutes = require('./routes/paysheet.routes');
const contractRoutes = require('./routes/contract.routes');
const leaveRoutes = require('./routes/leave.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running!');
});

app.use('/api/v1/city', cityRoutes);
app.use('/api/v1/role', roleRoutes);
app.use('/api/v1/position', positionRoutes);
app.use('/api/v1/departament', departamentRoutes);
app.use('/api/v1/contract-status', contractStatusRoutes);
app.use('/api/v1/contract-type', contractTypeRoutes);
app.use('/api/v1/approval-status', approvalStatusRoutes);
app.use('/api/v1/leaves-status', leavesStatusRoutes);
app.use('/api/v1/leaves-type', leavesTypeRoutes);
app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/paysheet', paysheetRoutes);
app.use('/api/v1/contract', contractRoutes);
app.use('/api/v1/leave', leaveRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});