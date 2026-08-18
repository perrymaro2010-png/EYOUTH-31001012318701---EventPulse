const asyncHandler = (fn) => (req, res, next)=>{
    Promise.resolve(fn(req, res, next)).catch(next);
};

const ok = (res, data, message = 'success', code = 200) =>{
    res.status(code).json({status: 'success', message, data});
};

const okList = (res, {data, page, limit, totalResults, totalPages}, code = 200) =>{
    res.status(code).json({status: 'success', page, limit, totalResults, totalPages, data});
}
module.exports = {asyncHandler, ok, okList};