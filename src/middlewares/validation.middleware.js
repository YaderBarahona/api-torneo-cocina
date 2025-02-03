export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path.join(".");
      errors[field] = issue.message;
    });

    return res.status(400).json({
      status: "error",
      message: "Algunos campos no cumplen con los requisitos.",
      details: errors, 
    });
  }
  next();
};
