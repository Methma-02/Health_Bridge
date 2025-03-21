// Middleware to check if the user has read access
const canRead = (req, res, next) => {
    const userRole = req.user.role; // Assuming the user role is attached to the request object
    if (['mother', 'physician', 'nurse', 'midwife', 'phm', 'admin'].includes(userRole)) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have read access' });
    }
};

// Middleware to check if the user has write access
const canWrite = (req, res, next) => {
    const userRole = req.user.role;
    if (['physician', 'nurse', 'midwife', 'phm', 'admin'].includes(userRole)) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have write access' });
    }
};

// Middleware to check if the user can edit sensory screening
const canEditSensoryScreening = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === 'mother') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have access to edit sensory screening' });
    }
};