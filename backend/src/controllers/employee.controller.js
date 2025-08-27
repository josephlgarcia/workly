const Employee = require('../models/employee.model');
const bcrypt = require('bcryptjs');

const employeeController = {
    getAllEmployees: async (req, res) => {
        try {
            const employees = await Employee.getAll();
            res.json(employees);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error to get all employees', error: error.message });
        }
    },

    getEmployeeById: async (req, res) => {
        try {
            const employee = await Employee.getById(req.params.id);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.json(employee);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error to get the employee', error: error.message });
        }
    },

    createEmployee: async (req, res) => {
        const { employeeData, phoneNumbers } = req.body;

        if (!employeeData || !employeeData.email || !employeeData.first_name || !phoneNumbers || phoneNumbers.length === 0) {
            return res.status(400).json({ message: 'Employee data and at least one phone number are required fields.' });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(employeeData.password, salt);

            employeeData.password = hashedPassword;

            const newEmployeeId = await Employee.create(employeeData, phoneNumbers);
            res.status(201).json({ message: 'Employee created successfully!', id: newEmployeeId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error to create the employee', error: error.message });
        }
    },

    updateEmployee: async (req, res) => {
        const { id } = req.params;
        const { employeeData, phoneNumbers } = req.body;

        try {
            if (employeeData.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(employeeData.password, salt);
                employeeData.password = hashedPassword;
            }

            const updated = await Employee.update(id, employeeData, phoneNumbers);
            if (!updated) {
                return res.status(404).json({ message: 'Employee not found for update' });
            }
            res.status(200).json({ message: 'Employee updated successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error to update the employee', error: error.message });
        }
    },

    deleteEmployee: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await Employee.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Employee not found for deletion' });
            }
            res.status(200).json({ message: 'Employee deleted successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error to delete the employee', error: error.message });
        }
    },

    loginEmployee: async (req, res) => {
    const { documentNumber, password } = req.body;

    if (!documentNumber || !password) {
      return res.status(400).json({ message: 'Document number and password are required.' });
    }

    try {
      const employee = await Employee.getByDocumentNumber(documentNumber);

      if (!employee) {
        return res.status(401).json({ message: 'Invalid document number or password.' });
      }

      const isMatch = await bcrypt.compare(password, employee.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid document number or password.' });
      }

      res.status(200).json({
        message: 'Login successful!',
        employee: {
          id: employee.id,
          first_name: employee.first_name,
          email: employee.email,
          role_name: employee.role_name
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
  }
};

module.exports = employeeController;