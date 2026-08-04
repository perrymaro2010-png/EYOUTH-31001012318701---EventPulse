const asyncHandler = (fn) => (req, res, next)=>{
    Promise.resolve(fn(req, res, next)).catch(next);
};

const ok = (res, data, message = 'success', code = 200) =>{
    res.status(code).json({status: code, message, data});
};

module.exports = {asyncHandler, ok};