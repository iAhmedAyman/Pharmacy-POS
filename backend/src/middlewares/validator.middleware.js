/**
 * A generic middleware factory for Zod validation.
 * @param {object} schema - The Zod schema to validate against.
 * @param {string} source - Where the data is coming from: 'body', 'query', or 'params'.
 */

const validate = (schema, source = 'body')=>{
    return (req,res,next)=>{
        const validationResult = schema.safeParse(req[source]);

        if(!validationResult.success) {
            return res.status(400).json({ 
                status: 'error', 
                // Map the errors into a clean, human-readable format
                message: validationResult.error.issues.map(err => err.message).join(', ')
            });
        }

        // Remove any unwatned extra fields
        if (source === 'body') {
            // Reassign req.body
            req.body = validationResult.data; 
        } else { // Reassoin req.query            
            // Delete existing keys
            Object.keys(req[source]).forEach(key => delete req[source][key]);
            
            // Assign only the clean, validated data back into the object
            Object.assign(req[source], validationResult.data);
        }

        next();
    }
}

export default validate;